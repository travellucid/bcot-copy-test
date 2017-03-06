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
    $cid = $request_type . '_' . $locale . '_' . $wine_id;
    $cache = \Drupal::cache()->get($cid);
    
	if ($cache) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
      $response = brancott_rest_api_reponse('http://gateway.pernod-ricard-winemakers.com/v2/brancott%20estate/' . $locale . '/wines/' . $wine_id . '/en');
    }
	
    if ($response['code'] == 200) {
		$result = json_decode($response['result']);
		if($result->id) {
			\Drupal::cache()->set($cid, $response['result']);
		}
      $data = $result;
    }
    return $data;
  }

}
