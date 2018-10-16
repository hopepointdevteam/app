<?php
namespace App\Controllers;

use \Core\View;
use \App\Models\CCB;

class Calendar extends \Core\Controller
{
  public function loadAction()
  {
    $ccb = new CCB();
    echo $ccb->getCalendar();
  }

}