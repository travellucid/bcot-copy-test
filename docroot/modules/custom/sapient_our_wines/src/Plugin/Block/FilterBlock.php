<?php

/**
 * @file
 * Contains \Drupal\sapient_our_wines\Plugin\Block\FilterBlock.
 */

namespace Drupal\sapient_our_wines\Plugin\Block;

use Drupal\Core\Database\Database;
use Drupal\Core\Block\BlockBase;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\TermInterface;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Template\TwigEnvironment;
use Drupal\brancott_rest_api\Controller\BrancottRestApiControllerFilters;
use Drupal\brancott_rest_api\Controller\BrancottRestApiControllerRanges;

/**
 * Provides a 'filter_block' block.
 *
 * @Block(
 *   id = "Filter_block_our_wines",
 *   admin_label = @Translation("Our wines Filter Block"),
 *   category = @Translation("Custom blocks")
 * )
 */
class FilterBlock extends BlockBase implements BlockPluginInterface
{

    /**
   * {@inheritdoc}
   */
    public function build() 
    {
			
			/*$rest_api = new BrancottRestApiControllerFilters;
            $values = $rest_api->getFilters();
			
			$rest_api_ranges = new BrancottRestApiControllerRanges;
            $values_ranges = $rest_api_ranges->getRanges();
			
			$ranges = array();
			$wine_types = array();
			$varietals = array();
			$food_matches = array();
			 $first_level = array();
			 $all_level = array();
			 $new_array = array();
			foreach($values as $value){
				$ranges[] = $value->range;
				$wine_types[] = $value->wineType;
				$varietals[] = $value->grapeVariety;
				$food_matches[] = $value->foodMatch;
				
			}
             $unique_range = array_unique($ranges);
			 $unique_wine_types = array_unique($wine_types);
			 $unique_varietals = array_unique($varietals);
			 $unique_food_matches = array_unique($food_matches);
			
			   
			foreach($unique_food_matches as $uni_food_matches){
				$first_level[] = explode(", ", $uni_food_matches); 
			}
			foreach($first_level as $first_lev){
				foreach($first_lev as $lev){
				$all_level[] = explode(":", $lev); 
				}
			}
			foreach($first_level as $first_lev){
				foreach($first_lev as $lev){
				$all_level[] = explode(":", $lev); 
				}
			}
			foreach($all_level as $all_lev){
				if($all_lev[0]) {
					if(!in_array($all_lev[1], $new_array[$all_lev[0]])) {
						$new_array[$all_lev[0]][] = $all_lev[1];
					}
				}
			}
			
			$range_title = array();
			$range_strapline = array();
			$range_description = array();
			$arr_title = array();
			foreach($values_ranges as $values_range){
				$range_title[] = $values_range->title;
			    $range_strapline[] = $values_range->strapline;
			    $range_description[] = $values_range->description;
				foreach($values as $value){
				if($value->range == $values_range->title){
					$arr_title[$values_range->title][$value->id] = $value->title;
				}
			}
			//$theme_var[] = theme(arr_title, range_strapline, range_description);
			}
			//print_r($arr_title);die('sallu');
			/*$name = 'wines_hero_component';
			$display_id = 'wine_id';
			$views_wine_image = views_get_view_result('wines_hero_component', 'wine_id', 9);
			//$args = [$tid];*/
			/*$ids = array();
            foreach($arr_title as $ar_title){
				foreach($ar_title as $key => $value){
					$ids[$key] = \Drupal::entityQuery('node')
                   ->condition('status', 1)
                   ->condition('field_wine_id', $key)
                   ->execute();
				}
				
			}
			$result_fids = array_filter($ids);  
			    $path = array();
			foreach($result_fids as $result_fid){
				//print_r($value);die('sallu');	
                foreach($result_fid as $res_fid){	
               					
				$node = \Drupal\node\Entity\Node::load($res_fid);
			    $target_id = $node->field_wine_bottle_image->target_id;
			    
			    $file = \Drupal\file\Entity\File::load($target_id);
			    $path[] = $file->getFileUri();
					
				}
				print_r('test' );die('sallu');
			    //$url = \Drupal\image\Entity\ImageStyle::load('medium')->buildUrl($file->getFileUri());
				
			}*/
			
            print_r('test');
	                
			
    }	 
}
