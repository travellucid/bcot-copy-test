<?php

/**
 * @file
 * Contains \Drupal\products\Controller\FilterController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;

class BrancottRestApiControllerFilters extends ControllerBase {

  /**
   * Callback function to get the data from REST API
   */
  public function getFilters() {

//    \Drupal::service('page_cache_kill_switch')->trigger();
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $data = array();
    $response = $data = $result = null;
    $request_type = 'filter_details';
    $cid = $request_type . '_' . $language;
    $cache = \Drupal::cache()->get($cid);
    $lang_explode = explode("-", $language);
    if ($language == 'en') {
      $locale = 'row';
    }
    else {
      $locale = $lang_explode[1];
    }
    $data = array();
    $response = $data = $result = null;
    $request_type = 'wine_listing';
    $cid = $request_type . '_' . $locale;
    $cache = \Drupal::cache()->get($cid);
    if ($cache) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
      $vc = $this->config('brancott_our_wines.settings');
      $dch_ranges_url = $vc->get('dch_wine_url');
      $response = brancott_rest_api_reponse($dch_ranges_url . '/' . $locale . '/wines/en');
    }
    if ($response['code'] == 200) {
      $cache_ttl = \Drupal::config('brancott_our_wines.settings')->get('cache_ttl');
      $current_time = time();
      $cache_time = $cache_ttl + $current_time;
      \Drupal::cache()->set($cid, $response['result'], $cache_time);
      $result = json_decode($response['result']);
      $data = $result;
    }

    return $data;
  }

}
