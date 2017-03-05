<?php

/**
 * @file
 * Contains \Drupal\products\Controller\SearchController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Controller routines for products routes.
 */
class BrancottSearchFilterController extends ControllerBase {

  /**
   * Request stack.
   *
   * @var RequestStack
   */
  public $request;

  /**
   * Class constructor.
   *
   * @param RequestStack $request
   *   Request stack.
   */
  public function __construct(RequestStack $request) {
    $this->request = $request;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
        // Load the service required to construct this class.
        $container->get('request_stack')
    );
  }

  public function getSearchResults($filter_value = NULL) {
    $range = $this->request->getCurrentRequest()->get('range');
    $wine_type = $this->request->getCurrentRequest()->get('wine_type');
    $varietals = $this->request->getCurrentRequest()->get('varietals');
	$foodfilter = $this->request->getCurrentRequest()->get('food_matches');

    $rest_api = new BrancottRestApiControllerFilters;
    $values = $rest_api->getFilters();
    //print_r($values); exit;
    $wine_details = array();
    foreach ($values as $value) {
      if ($range && strpos($value->range, $range)=== false ) {
        continue;
      }
      if ($wine_type && strpos($value->wineType, $wine_type) === false) {
        continue;
      }
      if ($varietals && strpos($value->grapeVariety, $varietals) === false ) {
        continue;
      }
	  if ($foodfilter && strpos($value->foodMatch, $foodfilter) === false ) {
        continue;
      }
	  
      $food_matches[] = $value->foodMatch;
      $final_array['filters'] = array();

      
      $ids = \Drupal::entityQuery('node')
          ->condition('status', 1)
          ->condition('field_wine_id', $value->id)
          ->execute();
      $wine_image_url = '';
      //$wine_details[$value->id]['title'] = $value->title;
      if (count($ids)) {
		$wine_details[$value->id]['title'] = $value->title;
		$wine_details[$value->id]['range'] = $value->range;
		$related_nodes = array_filter($ids);
        $related_wine_nid = reset($related_nodes);
        $wine_node_details = \Drupal\node\Entity\Node::load($related_wine_nid);
		
        $wine_file_id = $wine_node_details->field_wine_bottle_image->target_id;
        $wine_image_file = \Drupal\file\Entity\File::load($wine_file_id);
		if($wine_image_file){
                       $wine_image_url = file_create_url($wine_image_file->getFileUri());
		               $wine_details[$value->id]['url'] = $wine_image_url;
					   $wine_details[$value->id]['nid'] = $related_wine_nid;
					   
		            }
        
      }
      
    
      $final_array = $wine_details;
     
    }
	
	
	
	 if ($range) {
        $range_details = $this->getRangeDetails($range);
		//print_r($range_details); die;
		 $table =  array(
         '#theme' => 'search_results_range_template',
         '#search_array' => $wine_details,
	     '#range_details' =>  $range_details,
       );
    } else {
		 $table =  array(
         '#theme' => 'search_results_template',
         '#search_array' => $wine_details,
       );
	}		  
	  
	 
   
    $markup = drupal_render($table);
    
    $response = new Response();
    $response->setContent($markup);
    return $response;
    
  }

  public function getRangeDetails($range_title) {
    $rest_api_ranges = new BrancottRestApiControllerRanges;
    $values_ranges = $rest_api_ranges->getRanges();
    $range_details = array();
    foreach ($values_ranges as $values_range) {
      if ($range_title == $values_range->title) {
        $range_details['title'] = $values_range->title;
        $range_details['strapline'] = $values_range->strapline;
        $range_details['description'] = $values_range->description;
        break;
      }
    }
    return $range_details;
  }

}
