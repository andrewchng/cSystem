<?php
class TwitterSender implements SocialMediaSender {
	// public function sendTweet() {
	// 	$time = Carbon\Carbon::now();
	// 	try {
	// 		$result = Twitter::postTweet(array(
	// 			'status' => 'Posting of from System @ ' . $time->toDateTimeString(),
	// 			'format' => 'json'
	// 		));
	// 		return array('success' => array('message' => 'Success'));
	// 	} catch(Exception $e) {
	// 		return array('error' => array('message' => $e->getMessage()));
	// 	}
	// }

	public function sendMessage($message) {
		try{ 
			Twitter::postTweet(array(
				'status' => substr($message, 0, 140),
				'format' => 'json'
			));
		} catch (Exception $e) {
			var_dump($e->getMessage());
		}
	}
}
?>