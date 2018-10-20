<?php

namespace App;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use App\Config;

class Mail extends \Core\Model
{
	public static function send($from, $email, $subject, $text, $html)
	{
		$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
		try {
		    //Server settings
		    $mail->SMTPDebug = 2;                                 // Enable verbose debug output
		    $mail->isSMTP();                                      // Set mailer to use SMTP
		    $mail->Host = Config::EMAIL_HOST;  					  // Specify main and backup SMTP servers
		    $mail->SMTPAuth = true;                               // Enable SMTP authentication
		    $mail->Username = Config::EMAIL_USERNAME;                 // SMTP username
		    $mail->Password = Config::EMAIL_PASSWORD;                           // SMTP password
		    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
		    $mail->Port = 587;                                    // TCP port to connect to

		    //Recipients
		    $mail->setFrom($email, $from);
		    $mail->addAddress(Config::RECIPIENT_EMAIL);     // Add a recipient
		    //$mail->addAddress('ellen@example.com');               // Name is optional
		    $mail->addReplyTo('admin@admin.com', 'Information');
		    //$mail->addCC('cc@example.com');
		    //$mail->addBCC('bcc@example.com');

		    //Attachments
		    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

		    //Content
		    $mail->isHTML(true);                                  // Set email format to HTML
		    $mail->Subject = $subject;
		    $mail->Body    = $html;
		    $mail->AltBody = $text;

		    $mail->send();
		    
		} catch (Exception $e) {
		    // echo 'Mailer Error: ' . $mail->ErrorInfo;
		}
	}
}
