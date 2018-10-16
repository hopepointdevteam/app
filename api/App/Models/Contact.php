<?php

namespace App\Models;
 
use \App\Mail;

class Contact extends \Core\Model
{

	protected $toEmail = [];

	public function __construct($data = [])
	{
		foreach($data as $k => $v)
		{
			$this->$k = $v;
		}
	}

	public function email()
	{
		$from = filter_var(ucfirst($this->name),FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		$email = filter_var($this->email, FILTER_VALIDATE_EMAIL);
		$phone = filter_var($this->phone, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		$message = filter_var($this->message, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
		
		$subject = 'New Website Contact From '. $from;

		$html = $this->buildEmailHtml($from, $email, $phone, $message, $subject);

		if( $html ){
			$text = '
				You have an email from '. $from .'.\n
				'. $message .'. \n
				You can contact them at email: '. $email .' or phone: '. $phone .'
			';
			/*
				Send Email to recipient -> Hope Point Front Office
				From: $from
				From Email: $email
				Subject: $subject
				Text fallback if html not enabled on mail server: $text
				HTML version of email: $html
			*/
			if( Mail::send($from, $email, $subject, $text, $html) ){
				return true;
			} else {
				return false;
			}
		}
	}	

	public function buildEmailHtml($from, $email, $phone, $message, $subject){		
		$html = '
			<html>
				<body>
					<table width="80%" border="1" cellspacing="10" cellpadding="15">
						<tr><th scope="row"><img src="http://hopepointnaz.org/images/HPN_Logo_250x250.png" width="100" height="100"></th><td>'. $subject .'</td></tr>
						<tr><th scope="row">NAME:</th><td>'.$from.'</td></tr>
						<tr><th scope="row">EMAIL:</th><td>'.$email.'</td></tr>
						<tr><th scope="row">PHONE:</th><td>'.$phone.'</td></tr>
						<tr><th scope="row">MESSAGE:</th><td>'.$message.'</td></tr>
					</table>
				</body>
			</html>
		';

		return $html;
	}

}