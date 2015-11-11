<?php
class SocialMediaController extends BaseController {
	private $_SENDER;

	public function __construct() {
		$this->_SENDER = array(
			'facebook' 	=> new FacebookSender(),
			'twitter'	=> new TwitterSender()
		);
	}

	public function send($message, $type = 'all') {
		$type = strtolower($type);
		if ($type != 'all' && !array_key_exists($type, $this->_SENDER)) {
			return Response::json(array(
    			'error' => array(
    					'message' => 'Invalid Parameters',
    					'code' => 400
    				)
    		), 400);
		}

		if ($message) {
			foreach ($this->_SENDER as $type => $sender) {
				$sender->sendMessage($message);
			}
			return Response::json(array(
				'message' => 'ok'
			));
		} else {
			return Response::json(array(
    			'error' => array(
    					'message' => 'Missing message',
    					'code' => 400
    				)
    		), 400);
		}
		
	}
}
?>