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
			//print_r('test');die('salman');
			$rest_api = new BrancottRestApiControllerFilters;
            $values = $rest_api->getFilters();
			//print_r($values);die;
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
			
			
			/*return array(
                    '#theme' => 'sapient_filter_block_template',
                    '#names' => $new_array,
					
                    );*/
			//print_r($new_array);die;
    }	 
}
