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
    //print $cid; exit;
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
      $response = brancott_rest_api_reponse($dch_ranges_url. '/' . $locale . '/wines/en');
    }
    if ($response['code'] == 200) {
      \Drupal::cache()->set($cid, $response['result']);
      $result = json_decode($response['result']);
      $data = $result;
    }

    return $data;
  }

}
