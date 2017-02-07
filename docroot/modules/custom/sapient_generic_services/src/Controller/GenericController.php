<?php

namespace Drupal\sapient_generic_services\Controller;

use Drupal\Core\Controller\ControllerBase;
use Cmfcmf\OpenWeatherMap;
use Cmfcmf\OpenWeatherMap\Exception as OWMException;

class GenericController extends ControllerBase{
  public function content(){
    $lang = 'en';
    $units = 'metric';
    $owm = new OpenWeatherMap('bd4028edc390aa0629042fefed9976ca');
    //$key = $owm->getApiKey();
      $weather = $owm->getWeather('Australia', $units, $lang);
      print_r($weather);
      exit;
     /*return array(
        '#markup' => 'Current: '.$weather->temperature->now
      );*/
        
  }
}
