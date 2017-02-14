<?php

/**
 * @file
 * Contains \Drupal\products\Controller\RangeController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;





class BrancottRestApiControllerNew extends ControllerBase {

  /**
   * Callback function to get the data from REST API
   */
  public function getRanges() {
    $response = brancott_rest_api_reponse('http://gateway.pernod-ricard-winemakers.com/v2/brancott%20estate/nz/wines/en');
	$result = json_decode($response);
	print_r($result);die('tesrrr');
    /*\Drupal::service('page_cache_kill_switch')->trigger();
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $data = array();
    $response = $data = $result = null;
    $request_type = 'wine_details';
    $cid = $request_type . '_' . $language . '_' . $wine_id;
    //print $cid; exit;
    $cache = \Drupal::cache()->get($cid);
    if (0) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
//      print "here";
//      exit;
      //http://brancottvanilla.dev.dd:8083/sample.json
      //$response = brancott_rest_api_reponse('http://gateway.pernod-ricard-winemakers.com/v2/brancott%20estate/' . $locale . '/wines/' . $wine_id . '/en');
     // $response = brancott_rest_api_reponse('http://brancottvanillascfanqpukk.devcloud.acquia-sites.com/sample.json');
	  //$response = brancott_rest_api_reponse(' http://gateway.pernod-ricard-winemakers.com/v2/brancott%20estate/nz/wines/en');
    }*/
    if ($response) {
      \Drupal::cache()->set($cid, $response);
      $result = json_decode($response);
      $data = array();

      // # add all the data in one multiple dim array
      
      $data = $result;
      // display the content in the middle section of the page
      $build = array(
        '#theme' => 'range_content', // assign the theme [products-list.html.twig]
        '#title' => 'products to consume REST API', // assign the page title
        '#pagehtml' => 'data is coming from : products/list ', // assign the string message like this
        '#data' => $data
      ); // assign the array like this to access in twig file
    }
    return $data;
  }

}
