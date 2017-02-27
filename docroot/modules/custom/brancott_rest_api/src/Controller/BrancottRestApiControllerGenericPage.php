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
  public function getGenericPage($generic_dch_url, $locale = 'nz') {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $data = array();
    $response = $data = $result = null;
    $request_type = 'generic_page';
    $cid = $request_type . '_' . $language;
    $cache = \Drupal::cache()->get($cid);
    if (0) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
	$response = brancott_rest_api_reponse($generic_dch_url);
     //$response = brancott_rest_api_reponse('http://brancottvanillascfanqpukk.devcloud.acquia-sites.com/sample.json');
    }
	
    if ($response) {
      \Drupal::cache()->set($cid, $response);
      $result = ($response);
      $data = array();

      // # add all the data in one multiple dim array
    
      $data = $result;
      // display the content in the middle section of the page
    }
    return $data;
  }

}
