<?php

/**
 * @file
 * Contains \Drupal\products\Controller\SearchController.
 */

namespace Drupal\brancott_rest_api\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RequestStack; 
use Symfony\Component\DependencyInjection\ContainerInterface;
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
	  //print_r('test');die;
      $range = $this->request->getCurrentRequest()->get('range');
      $wine_type = $this->request->getCurrentRequest()->get('wine_type');
      	  
      //print_r($wine_type);die;
	  $rest_api = new BrancottRestApiControllerFilters;
            $values = $rest_api->getFilters();
			//print_r($values);die;
	  			 $final_array = array();
			foreach($values as $value){
				  $first_level = array();
			      $all_level = array();
				if($range && $value->range != $range) {
					continue;
				}
				if($wine_type && $value->wineType != $wine_type) {
					continue;
				}
				$food_matches[] = $value->foodMatch;
				$final_array['filters'] = array();
				$wine_details[$value->range][$value->id]['title'] = $value->title;
				$wine_details[$value->range][$value->id]['range'] = $value->range;
				$ids = \Drupal::entityQuery('node')
                   ->condition('status', 1)
                   ->condition('field_wine_id', $value->id)
                   ->execute();
				   $wine_image_url = '';
				if(count($ids)) {  
					$related_nodes = array_filter($ids);
					$related_wine_nid = reset($related_nodes);
					$wine_node_details = \Drupal\node\Entity\Node::load($related_wine_nid);
					$wine_file_id = $wine_node_details->field_wine_bottle_image->target_id;
					$wine_image_file = \Drupal\file\Entity\File::load($wine_file_id);
					$wine_image_url = \Drupal\image\Entity\ImageStyle::load('medium')->buildUrl($wine_image_file->getFileUri());
				}
				$wine_details[$value->range][$value->id]['url'] = $wine_image_url;  
				$range_details = $this->getRangeDetails($value->range);
				$range_details['associated_wines'] = $wine_details[$value->range];
				$final_array['range_details'][$value->range] = $range_details;
				//new code
				$final_array_ranges = $final_array['range_details'][$value->range]['associated_wines'];
				//new code terminated
			}
			//print_r($final_array); die;;
			return array(
                    '#theme' => 'search_results_template',
                    '#search_array' => $final_array_ranges,
					);
			
  }
  
  
    public function getRangeDetails($range_title) {
	$rest_api_ranges = new BrancottRestApiControllerRanges;
    $values_ranges = $rest_api_ranges->getRanges();
	$range_details = array();
	foreach($values_ranges as $values_range){
			if($range_title == $values_range->title){
					$range_details['title'] = $values_range->title;
					$range_details['strapline'] = $values_range->strapline;
					$range_details['description'] = $values_range->description;
					break;
				}

				
			}
			return $range_details;
    }

}
