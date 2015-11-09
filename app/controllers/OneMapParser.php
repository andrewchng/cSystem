<?php
use GuzzleHttp\Client;

class OneMapParser implements BaseMapParser {
	private $_BASE_URL = 'http://www.onemap.sg/API/services.svc';
	private $_ACCESS_KEY = 'xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi';
	private $_THEME_NAME = 'DENGUE_CLUSTER';
	private $_SG_EXTENTS = '-4423.6,15672.6,69773.4,52887.4';
	
	private $_CLIENT;
	private $_TOKEN;
	private $_LAYER_INFO;

	public function __construct() {
		$this->_CLIENT = new Client;
		$this->getToken();
		$this->loadMapInfo();
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
				return $result->SrchResults;
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
		$data->FEATTYPE = $this->_LAYER_INFO->FEATTYPE;
		$data->OUTLINECOLOR = $this->_LAYER_INFO->OUTLINECOLOR;
		$data->LINETHICKNESS = $this->_LAYER_INFO->LINETHICKNESS;
		$data->TYPE = 'dengue';
		$data->CASECOUNT = (int)$data->{'Number of cases'};
		$data->TITLE = 'Dengue Cluster';
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
}
?>