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
    
	\Drupal::service('page_cache_kill_switch')->trigger();
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $data = array();
    $response = $data = $result = null;
    $request_type = 'filter_details';
    $cid = $request_type . '_' . $language;
    //print $cid; exit;
    $cache = \Drupal::cache()->get($cid);
    if (0) {
      $result = json_decode($cache->data);
      return $result;
    }
    else {
     
      $response = brancott_rest_api_reponse('http://brancottvanillascfanqpukk.devcloud.acquia-sites.com/sample1.json');
    }
    if ($response) {
      //\Drupal::cache()->set($cid, $response);
      $result = json_decode($response);
	 
      $data = array();

      // # add all the data in one multiple dim array
      
      $data = $result;
      // display the content in the middle section of the page
      
    }
	
    return $data;
  }

}
