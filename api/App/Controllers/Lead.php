<?php
namespace App\Controllers;

use \Core\View;
use \App\Models\Contact;
use \App\Config;

class Lead extends \Core\Controller
{
  public function sendAction()
  {
    $jsonData = file_get_contents('php://input');
    $sender = json_decode($jsonData, true);

   foreach($sender as $s){
      if($s['website'] !== ''){
        return false;
      } else {
        $contact = new Contact($s);
        // Comment below for development so you don't flood your email account and get flagged as spam
        if($contact->email()){
          echo json_encode(array('message' => 'Message Delivered'));
          return true;
        } else {
          echo json_encode(array('message' => 'Your message could not be delivered'));
          return false;
        }
      }
    }    
  }

}