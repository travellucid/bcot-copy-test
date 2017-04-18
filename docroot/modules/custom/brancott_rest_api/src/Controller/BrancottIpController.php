<?php

/**
 * @file
 * Contains \Drupal\products\Controller\IpController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller routines for products routes.
 */
class BrancottIpController extends ControllerBase {

  /**
   * Callback function to get the data from REST API
   */
  public function getIpDetails($ip = NULL) {
    
    
    
    $data = array();
    $response = $data = $result = null;
    $request_type = 'ip_details';
    $cid = $request_type . '_' . $ip;
    $cache = \Drupal::cache()->get($cid);

    if ($cache) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
      
      $response = brancott_rest_api_reponse('http://gateway.pernod-ricard-winemakers.com/geoip/json/' . $ip);
    }
    
    if ($response['code'] == 200) {
      
      $result = json_decode($response['result']);
      if ($result->id) {
        \Drupal::cache()->set($cid, $response['result']);
      }
      $data = $result;
    }
    //print_r($data);die;
    return $data;
  }

}
