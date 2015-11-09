<?php
use GuzzleHttp\Client;

class LTAParser implements BaseMapParser {
	private $_ONEMAP_BASE_URL = 'http://www.onemap.sg/API/services.svc';
	private $_ACCESS_KEY = 'xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi';

	private $_BASE_URL = 'http://datamall.mytransport.sg/ltaodataservice.svc';
	private $_ACCOUNT_KEY = 'FJtitxzoGkib9ljyfRHf7A==';
	private $_UUID = 'd7530ac5-1393-4878-8034-4588db98baca';
	
	private $_CLIENT;
	private $_TOKEN;
	private $_LAYER_INFO;

	public function __construct() {
		$this->_CLIENT = new Client;
	}

	public function getExternalData($queryParam = []) {
		$response = $this->_CLIENT->get($this->_BASE_URL . '/IncidentSet', [
				'headers' => [
					'Accept' 		=> 'application/json',
					'AccountKey'	=> $this->_ACCOUNT_KEY,
					'UniqueUserId'	=> $this->_UUID,
				]
			]);
		if ($response->getStatusCode() != 200) {
			throw new Exception("Error Getting External LTA Data. Status Code: " . $response->getStatusCode());
		}
		$result = json_decode($response->getBody());
		$message = 'Unknown Server Error';
		if (isset($result->d)) {
			$result = $result->d;
			foreach ($result as $data) {
				$this->formatData($data);
			}
			return $result;
		}
		return array();
	}

	private function formatData($data) {
		$data->DESCRIPTION = isset($data->Message) ? $data->Message : $data->reportName;
		if (isset($data->Latitude) && isset($data->Longitude)) {
			$svy = $this->WGS84toSVY21($data->Latitude, $data->Longitude);
			$data->XY = $svy->x . ',' . $svy->y;
		}
		$data->TYPE = $data->Type;
	}

	private function isError($response) {
		if ($response->getStatusCode() != 200) {
			return true;
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