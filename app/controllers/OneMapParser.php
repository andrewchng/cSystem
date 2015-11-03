<?php
use GuzzleHttp\Client;

class OneMapParser extends BaseMapParser {
	private $_BASE_URL = 'http://www.onemap.sg/API/services.svc';
	private $_ACCESS_KEY = 'xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi';
	private $_THEME_NAME = 'DENGUE_CLUSTER';
	private $_SG_EXTENTS = '-4423.6,15672.6,69773.4,52887.4';
	
	private $_CLIENT;
	private $_TOKEN;
	private $_LAYER_INFO;

	public function __construct() {
		set_error_handler(null);
		set_exception_handler(null);
		$this->_CLIENT = new Client;
		$this->getToken();
		$this->loadMapInfo();
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
            ->select('reports.*', 'reportstatustype.reportStatusTypeName', 'reporttype.reportTypeName')
            ->where('reporttype.reportTypeName', 'dengue')
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
        	$response = $this->_CLIENT->get($this->_BASE_URL . '/basicSearch', [
        			'query' => [
        				'token'		=> $this->_TOKEN,
        				'searchVal'	=> $report->location
        			]
        		]);
        	if ($response->getStatusCode() != 200) {
        		continue;
        	}
        	$search_result = json_decode($response->getBody());
        	if (isset($search_result->SearchResults) && isset($search_result->SrchResults[0]->ErrorMessage)) {
        		continue;
        	}
        	$search_result = $search_result->SearchResults;
        	if (sizeof($search_result) == 2) {
        		array_push($results, array(
        			'FEATTYPE'			=> 'POINT',
        			'Number of cases'	=> 1,
        			'DESCRIPTION'		=> $report->reportName,
        			'MAPTIP'			=> 'Dengue_Point',
        			'SYMBOLCOLOR'		=> '255,255,0',
        			'OUTLINECOLOR'		=> '0,0,0',
        			'LINETHICKNESS'		=> '1',
        			'XY'				=> $search_result[1]->X . ',' . $search_result[1]->Y,
        			'ICONNAME'			=> $this->_LAYER_INFO->ICONNAME,
        			'IconPath'			=> $this->_LAYER_INFO->IconPath,
        			'location'			=> $report->location
        		));
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
		$response = $this->_CLIENT->get($this->_BASE_URL . '/mashupData', [
				'query' => [
					'token' 	=> $this->_TOKEN,
					'themeName'	=> $this->_THEME_NAME,
					'otptFlds'	=> $this->_LAYER_INFO->FIELD_NAM_T,
					'extents'	=> $this->_SG_EXTENTS
				]
			]);
		$this->throwIfError($response);

		$result = json_decode($response->getBody());
		$code = 500;
		$message = 'Unknown Server Error';

		if (isset($result->SrchResults)) {
			if (isset($result->SrchResults[0]->FeatCount)) {
				unset($result->SrchResults[0]);
				foreach ($result->SrchResults as $data) {
					$this->formatData($data);
				}
				return Response::json(array_values($result->SrchResults));
			} elseif (isset($result->SrchResults[0]->ErrorMessage)) {
				$message = $result->SrchResults[0]->ErrorMessage;
				$code = 404;
			}
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
	    $response = $this->_CLIENT->get($this->_BASE_URL . '/getToken', [
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
		$data->SYMBOLCOLOR = $this->getSeverityColor($data->{'Number of cases'});
		$data->FEATTYPE = $this->_LAYER_INFO->FEATTYPE;
		$data->OUTLINECOLOR = $this->_LAYER_INFO->OUTLINECOLOR;
		$data->LINETHICKNESS = $this->_LAYER_INFO->LINETHICKNESS;
	}

	private function getSeverityColor($caseCount) {
		$hex = ($caseCount >= 10) ? $this->hex2rgb('#ff00000') : $this->hex2rgb('#ffff00');
		return $hex['r'] . ',' . $hex['g'] . ',' .$hex['b'];
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

	private function hex2rgb($hex) {
	   $hex = str_replace("#", "", $hex);

	   if(strlen($hex) == 3) {
	      $r = hexdec(substr($hex,0,1).substr($hex,0,1));
	      $g = hexdec(substr($hex,1,1).substr($hex,1,1));
	      $b = hexdec(substr($hex,2,1).substr($hex,2,1));
	   } else {
	      $r = hexdec(substr($hex,0,2));
	      $g = hexdec(substr($hex,2,2));
	      $b = hexdec(substr($hex,4,2));
	   }
	   $rgb = array('r' => $r, 'g' => $g, 'b' => $b);
	   return $rgb; // returns an array with the rgb values
	}
}
?>