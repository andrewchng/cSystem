<?php
use GuzzleHttp\Client;

class MapController extends BaseController {
	private $_ONEMAP_BASE_URL = 'http://www.onemap.sg/API/services.svc';
	private $_ACCESS_KEY = 'xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi';

	private $_CLIENT;
	private $_TOKEN;
	
	private $_DATA_PARSER;
	private $_ATTRIBUTES = [
		'TITLE', 'DESCRIPTION', 'CASECOUNT', 'XY', 'LOCATION', 'TYPE', 'FEATTYPE', 'SYMBOLCOLOR', 'OUTLINECOLOR', 'LINETHICKNESS', 'ICONPATH', 'ICONNAME'
	];

	public function __construct() {
		$this->_CLIENT = new Client;
		$this->getToken();
		$this->_DATA_PARSER = array(
			'dengue' => new OneMapParser(),
			'traffic' => new LTAParser()
		);
	}

	public function index($type = 'all', $source = 'both') {
		$type = strtolower($type);
		$source = strtolower($source);
		if (($type != 'all' && !array_key_exists($type, $this->_DATA_PARSER))
			|| !in_array($source, ['both', 'local', 'ext']))  {
			return Response::json(array(
        			'error' => array(
        					'message' => 'Invalid Parameters',
        					'code' => 400
        				)
        		), 400);
		}

		$results = array();
		if ($source == 'both') {
			$source = ['local', 'ext'];
		} else {
			$source = [$source];
		}
		foreach ($this->_DATA_PARSER as $p_type => $parser) {
			if ($type == 'all' || $p_type == $type) {
				if (in_array('local', $source)) {
					$results = array_merge($results, $this->getLocalData($p_type, True));
				}
				if (in_array('ext', $source)) {
					$results = array_merge($results, $parser->getExternalData());
				}
			}
		}
		if (sizeof($results) > 0) {
			foreach ($results as $key => $result) {
				$results[$key] = $this->formatData($result);
			}
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

	public function getLocalData($type, $skipped_on_empty = False) {
		$query = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->select('reports.reportName', 'reports.location');

        if (isset($type)) {
        	$query = $query->where('reporttype.reportTypeName', $type);
        }
		$reports = $query->get();
		if (empty($reports)) {
			if ($skipped_on_empty) {
				return array();
			}
        	return Response::json(array(
        			'error' => array(
        					'message' => 'No result found.',
        					'code' => 404
        				)
        		), 404);
        }
        $results = array();
        foreach ($reports as $report) {
        	if ($location = $this->getXYFromAddress($report->location)) {
        		$report->TITLE = $report->reportName;
        		$report->DESCRIPTION = isset($report->description) ? $report->description : "";
        		$report->XY = $location->X . ',' . $location->Y;
        		$report->TYPE = $type;
        		array_push($results, $report);
        	}
        }
        return $results;
	}

	private function getXYFromAddress($address) {
		$response = $this->_CLIENT->get($this->_ONEMAP_BASE_URL . '/basicSearch', [
			'query' => [
				'token'		=> $this->_TOKEN,
				'searchVal'	=> $address
			]
		]);
    	if ($response->getStatusCode() != 200) {
    		return;
    	}
    	$search_result = json_decode($response->getBody());
    	if (isset($search_result->SearchResults) && isset($search_result->SearchResults[0]->ErrorMessage)) {
    		return;
    	}
    	$search_result = $search_result->SearchResults;
    	if (sizeof($search_result) == 2) {
    		return $search_result[1];
    	}
	}

	private function getAddressFromXY($XY) {
		if (strpos($XY, "|")) {
			return "";
		}
		$response = $this->_CLIENT->get($this->_ONEMAP_BASE_URL . '/revgeocode', [
			'query' => [
				'token'		=> $this->_TOKEN,
				'location'	=> $XY
			]
		]);
		if ($response->getStatusCode() != 200) {
			return;
		}
		$search_result = json_decode($response->getBody());
    	if (isset($search_result->GeocodeInfo) && isset($search_result->GeocodeInfo[0]->ErrorMessage)) {
    		return;
    	}
    	$search_result = $search_result->GeocodeInfo[0];
    	if ($result = $search_result->ROAD){
    		if (isset($search_result->BLOCK)) {
    			return $search_result->BLOCK . ' ' . $result;
    		}
    		return $result;
    	}
    	return '';
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

	private function formatData($data) {
		$data = json_decode(json_encode(array_change_key_case((array)$data, CASE_UPPER)));
		$data->FEATTYPE = $this->getFeatType($data->XY);
		if (!isset($data->ICONPATH) || !isset($data->ICONNAME)) {
			$data->ICONPATH = 'assets/styles/img/';
			$data->ICONNAME = $this->getIcon($data->TYPE);
		}
		if (!isset($data->CASECOUNT)) {
			$data->CASECOUNT = 1;
		}
		if (!isset($data->LOCATION)) {
			$data->LOCATION = $this->getAddressFromXY($data->XY);
		}
		$data->SYMBOLCOLOR = $this->getSeverityColor($data->CASECOUNT);
		$data->OUTLINECOLOR = "0,0,0";
		$data->LINETHICKNESS = 1;
		foreach ($data as $key => $val) {
			if (!in_array($key, $this->_ATTRIBUTES)) {
				unset($data->{$key});
			}
		}
		return $data;
	}

	private function getFeatType($coordinates) {
		return strpos($coordinates, '|') ? 'Polygon' : 'Point';
	}

	private function getIcon($type) {
		switch (strtolower($type)) {
			case 'road work':
				return 'road_work.png';
			case 'accident':
				return 'accident.png';
			case 'dengue':
			case 'dengue_cluster':
				return 'mosquitoa20.jpg';
			default:
				return 'incident.png';
		}
	}

	private function getSeverityColor($caseCount) {
		$hex = ($caseCount >= 10) ? $this->hex2rgb('#ff00000') : $this->hex2rgb('#ffff00');
		return $hex['r'] . ',' . $hex['g'] . ',' .$hex['b'];
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