<?php

class EmailSender {
	public function sendEmail($to, $template, array $data) {
        $result = Mail::send($template, $data, function ($m) use ($to, $data) {
            $m->to($to)
                ->subject($data['subject']);
        });
        return $result;
	}
}
?>