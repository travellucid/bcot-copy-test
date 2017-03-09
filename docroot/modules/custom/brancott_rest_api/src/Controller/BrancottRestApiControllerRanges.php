<?php

/**
 * @file
 * Contains \Drupal\products\Controller\RangeController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;

class BrancottRestApiControllerRanges extends ControllerBase {

  /**
   * Callback function to get the data from REST API
   */
  public function getRanges() {
    \Drupal::service('page_cache_kill_switch')->trigger();
    $data = array();
    $response = $data = $result = null;
    $request_type = 'range_listing';
    $cid = $request_type;
    $cache = \Drupal::cache()->get($cid);
    if ($cache) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
      $vc = $this->config('sapient_our_wines.settings');
      $dch_ranges_url = $vc->get('dch_ranges_url');
      $response = brancott_rest_api_reponse($dch_ranges_url);
    }
    if ($response['code'] == 200) {
      \Drupal::cache()->set($cid, $response['result']);
      $result = json_decode($response['result']);
      $data = $result;
    }
    //print_r($response);die;
    return $data;
  }

}
