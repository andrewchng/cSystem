<?php
class NotificationController {
	private $socialMediaController;

	public function __construct(){
		$this->socialMediaController = new SocialMediaController();	
	} 
	
	public function update($old_record, $new_record) {
		if (empty($old_record)) {
			$message = $this->constructMessage($new_record->Title,$new_record);
		} else {
			$difference = $this->getDifference($old_record, $new_record);
			if (!empty($difference)) {
				$message =  $this->constructMessage($new_record->Title, $difference, false);				
			}
		}
		if (!empty($message)) {
			$this->socialMediaController->send($message);
		}
		
	}

	private function getDifference($old_record, $new_record){
		$changes = array();
		foreach ($old_record as $key=>$value) {
			if ($old_record->{$key} != $new_record->{$key}){
				$changes[$key] = $new_record->{$key};
			}
		}
		return $changes;
	}

	private function constructMessage($title, $items, $new = true) {
		$time = Carbon\Carbon::now();
		if ($new) {
			$message = 'New ' . $items->Type. ' report @ ' . $time->toDateTimeString() . '.';
			$message .= ' Title: ' . $items->Title;
			$message .= ' Location: ' . $items->Location;
		} else {
			$message = $title . ' has been updated @ ' . $time->toDateTimeString() . '.';
			foreach ($items as $key=>$value) {
				if (empty($value)) {
					continue;
				}
				$message .= $key . ': ' . $value . '. ';
			}
		}
		return $message;
	}
}
?>