<?php
use GuzzleHttp\Client;

class LTAParser extends BaseMapParser {
	private $_ONEMAP_BASE_URL = 'http://www.onemap.sg/API/services.svc';
	private $_ACCESS_KEY = 'xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi';

	private $_BASE_URL = 'http://datamall.mytransport.sg/ltaodataservice.svc';
	private $_ACCOUNT_KEY = 'FJtitxzoGkib9ljyfRHf7A==';
	private $_THEME_NAME = 'DENGUE_CLUSTER';
	private $_UUID = 'd7530ac5-1393-4878-8034-4588db98baca';
	
	private $_CLIENT;
	private $_TOKEN;
	private $_LAYER_INFO;

	public function __construct() {
		$this->_CLIENT = new Client;
		$this->getToken();
	}

	public function index() {
		$local_results = $this->getLocalData();
		$ext_results = $this->getExternalData();
		$all_data = array();

		if (!isset($local_results->getData()->error)) {
			$all_data = array_merge($all_data, $local_results->getData());
		}
		if (!isset($ext_results->getData()->error)) {
			$all_data = array_merge($all_data, $ext_results->getData());
		}
		if (sizeof($all_data) > 0) {
			return Response::json(array_values($all_data));
		} else {
			return Response::json(array(
        			'error' => array(
        					'message' => 'No result found.',
        					'code' => 404
        				)
        		), 404);
		}
	}

	public function getLocalData($queryParam = []) {
		$reports = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->select('reports.reportName', 'reports.location')
            ->where('reporttype.reportTypeName', 'traffic')
            ->get();
        if (empty($reports)) {
        	return Response::json(array(
        			'error' => array(
        					'message' => 'No result found.',
        					'code' => 404
        				)
        		), 404);
        }
        $results = array();
        foreach ($reports as $report) {
        	$response = $this->_CLIENT->get($this->_ONEMAP_BASE_URL . '/basicSearch', [
        			'query' => [
        				'token'		=> $this->_TOKEN,
        				'searchVal'	=> $report->location
        			]
        		]);
        	if ($response->getStatusCode() != 200) {
        		continue;
        	}
        	$search_result = json_decode($response->getBody());

        	if (isset($search_result->SearchResults) && isset($search_result->SearchResults[0]->ErrorMessage)) {
        		continue;
        	}
        	$search_result = $search_result->SearchResults;
        	if (sizeof($search_result) == 2) {
        		$report->XY = $search_result[1]->X . ',' . $search_result[1]->Y;
        		$report->Type = 'Incident';
        		$this->formatData($report);
        		array_push($results, $report);
        	}
        }
        if (sizeof($results) > 0) {
        	return Response::json(array_values($results));
        } else {
			return Response::json(array(
    			'error' => array(
    					'message' => 'No result found.',
    					'code' => 404
    				)
    		), 404);
        }
	}

	public function getExternalData($queryParam = []) {
		$response = $this->_CLIENT->get($this->_BASE_URL . '/IncidentSet', [
				'headers' => [
					'Accept' 		=> 'application/json',
					'AccountKey'	=> $this->_ACCOUNT_KEY,
					'UniqueUserId'	=> $this->_UUID,
				]
			]);
		$this->throwIfError($response);
		$result = json_decode($response->getBody());
		$code = 500;
		$message = 'Unknown Server Error';
		if (isset($result->d)) {
			$result = $result->d;
			foreach ($result as $data) {
				$this->formatData($data);
			}
			return Response::json(array_values($result));
		}

		$error_response = array(
            'error' => array(
                'message' => $message,
                'code' => $code
            )
        );
		return Response::json($error_response, $code);
	}

	private function getToken() {
	    $response = $this->_CLIENT->get($this->_ONEMAP_BASE_URL . '/getToken', [
	    		'query' => ['accessKey' => $this->_ACCESS_KEY]
	    	]);
	    $this->throwIfError($response);

	    $result = json_decode($response->getBody());
	    if (isset($result->GetToken) && isset($result->GetToken[0]->NewToken)) {
	    	$this->_TOKEN = $result->GetToken[0]->NewToken;
	    } else {
	    	App::abort(500, 'Could not retrieve token from OneMap.');
	    }
	}

	private function loadMapInfo() {
		$response = $this->_CLIENT->get($this->_BASE_URL . '/layerinfodm', [
				'query' => ['layerName' => $this->_THEME_NAME]
			]);
		$this->throwIfError($response);

		$result = json_decode($response->getBody());
		if (isset($result->LayerInfo[0])) {
			$this->_LAYER_INFO = $result->LayerInfo[0];
			$this->_LAYER_INFO->LINETHICKNESS = 1;
			$this->_LAYER_INFO->OUTLINECOLOR = '0,0,0';
		}
	}

	private function formatData($data) {
		$data->DESCRIPTION = isset($data->Message) ? $data->Message : $data->reportName;
		if (isset($data->Latitude) && isset($data->Longitude)) {
			$svy = $this->WGS84toSVY21($data->Latitude, $data->Longitude);
			$data->XY = $svy->x . ',' . $svy->y;
		}
		$data->FEATTYPE = 'POINT';
		$data->IconPath = 'assets/styles/img/';
		$data->ICONNAME = $this->getIcon(isset($data->Type) ? $data->Type : '');
		unset($data->Message);
		unset($data->Latitude);
		unset($data->Longitude);
		unset($data->__metadata);
		unset($data->Summary);
		unset($data->Distance);
	}

	private function getIcon($type) {
		switch ($type) {
			case 'Road Work':
				return 'road_work.png';
			case 'Accident':
				return 'accident.png';
			default:
				return 'incident.png';
		}
	}

	private function throwIfError($response) {
		if ($response->getStatusCode() != 200) {
			$error_response = array(
				'error' => array(
					'message'	=> 'One Map Error.',
					'code'		=> $response->getStatusCode()
				)
			);
			return Response::json($error_response, $response->getStatusCode());
	    }
	}

	private function WGS84toSVY21($latitude, $longitude) {
		$response = $this->_CLIENT->get('http://www.onemap.sg/omgeom/omgeom.svc/GetOutput',[
				'query' => [
					'token' => 'qo/s2TnSUmfLz+32CvLC4RMVkzEFYjxqyti1KhByvEacEdMWBpCuSSQ+IFRT84QjGPBCuz/cBom8PfSm3GjEsGc8PkdEEOEr',
					'Param' => 'project|inSR=4326|outSR=3414|geometries=' . $longitude . ',' . $latitude . '|f=pjson'
				]
			]);
		return json_decode($response->getBody())->geometries[0];
	}
}
?>