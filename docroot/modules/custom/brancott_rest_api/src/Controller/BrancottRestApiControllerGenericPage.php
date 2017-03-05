<?php

/**
 * @file
 * Contains \Drupal\products\Controller\ProductsController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller routines for products routes.
 */
class BrancottRestApiControllerGenericPage extends ControllerBase {

  /**
   * Callback function to get the data from REST API
   */
  public function getGenericPage($generic_dch_url) {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $data = array();
    $response = $data = $result = null;
    $request_type = 'generic_page';
    $cid = $request_type . '_' . $language;
    $cache = \Drupal::cache()->get($cid);
    if ($cache) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
      $response = brancott_rest_api_reponse($generic_dch_url);
    }

    if ($response['code'] == 200) {
      \Drupal::cache()->set($cid, $response['result']);
      $result = json_decode($response['result']);
      $data = $result;
    }
    return $data;
  }

}
