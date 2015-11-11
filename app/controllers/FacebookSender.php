<?php
//use Facebook\FacebookRequest;
use GuzzleHttp\Client;
class FacebookSender implements SocialMediaSender {
	const _PAGE_ID = '906535652734604';
	const _API_URL = 'https://graph.facebook.com';
	const _APP_TOKEN = 'CAAGBrox58OQBALAbZBcUooPRKJD2oPvCcZAQOmIYDAV1UxEX1aBjRzI8vchIigySQZAhfhQhHWMTLRALuM5l4NUxF93A3PIfZAU8Gmw8LoTbnqqXj5ahRH9YW4KWYqisPzLtltw5iktZByo12VPkUjJ08wqyjYIZAtK7cVR5WZBXpNW2dExIhpzElUfjs5xInZBrKkz3UmY2IAZDZD';
	private $_CLIENT;

	public function __construct() {
		$this->_CLIENT = new Client(array(
			'verify' => false
		));
	}
	
	public function sendMessage($message) {
		$response = $this->_CLIENT->POST(self::_API_URL . '/' . self::_PAGE_ID . '/feed', [
			'query' => [
				'access_token'  => self::_APP_TOKEN,
				'message'		=> $message
			]
		]);
		if ($response->getStatusCode() != 200) {
			throw new Exception("Error Posting to Facebook. Status Code: " . $response->getStatusCode());
		}
		$result = json_decode($response->getBody());
		if (isset($result->id)) {
			return $result->id;
		}
	}
}
?>