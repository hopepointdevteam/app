<?php
namespace App\Models;
use App\Config;
use DOMDocument;


class CCB extends \Core\Model
{

	public function getCalendar()
	{
		$srv = 'public_calendar_listing';

		$today = date("Y-m-d");
		$year = date('Y');
		$month = date('m');
		$day = date('d');
		
		$date_start = $today;
		$date_end = date("Y-m-d", strtotime($today . " + 30 days"));
		
		$url = Config::CCB_URL . $srv . '&date_start=' . $date_start . '&date_end=' . $date_end;
		
		$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_USERPWD, Config::CCB_USERNAME .':'. Config::CCB_PASSWORD);
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
			curl_setopt($ch, CURLOPT_HEADER, false);
		$output = curl_exec($ch);
		
		if (!curl_errno($ch)) {
			// Parse the XML and display
			$p = xml_parser_create();
			xml_parse_into_struct($p, $output, $vals, $index);
		
			xml_parser_free($p);
			//Load the XML result into a string
			$xml = simplexml_load_string($output);
			$cal_items = array();
		
			foreach($xml->response->items->item as $item){
				array_push($cal_items, $item);
			}
			
			$fp = fopen('/home1/hopepoin/public_html/preview/data/events.json', 'w');
			// $fp = fopen( $_SERVER['DOCUMENT_ROOT'] . '/preview/data/events.json', 'w');
			fwrite($fp, json_encode($cal_items));
			fclose($fp);
		
			echo json_encode($cal_items);
			
		
		} else {
			return false;
		}
	}

	

}
