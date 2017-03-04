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
class BrancottRestApiController extends ControllerBase {

  /**
   * Callback function to get the data from REST API
   */
  public function getProductDetails($wine_id, $locale = 'nz') {

    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $lang_explode = explode("-", $language);

    if ($language == 'en') {
      $locale = 'row';
    }
    else {
      $locale = $lang_explode[1];
    }
    $data = array();
    $response = $data = $result = null;
    $request_type = 'wine_details';
    $cid = $request_type . '_' . $language . '_' . $wine_id;
    $cache = \Drupal::cache()->get($cid);
    if ($cache) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
      $response = brancott_rest_api_reponse('http://gateway.pernod-ricard-winemakers.com/v2/brancott%20estate/' . $locale . '/wines/' . $wine_id . '/en');
    }

    if ($response) {
      \Drupal::cache()->set($cid, $response);
      $result = json_decode($response);
      $data = array();

      // # add all the data in one multiple dim array

      $data = $result;
      // display the content in the middle section of the page
    }
    return $data;
  }

}
