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
class FilterBlock extends BlockBase implements BlockPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function build() {

    $rest_api = new BrancottRestApiControllerFilters;
    $values = $rest_api->getFilters();

    $ranges = array();
    $wine_types = array();
    $varietals = array();
    $food_matches = array();
    $first_level = array();
    $all_level = array();
    $new_array = array();
    $final_array = array();
    foreach ($values as $value) {
      $first_level = array();
      $all_level = array();

      $food_matches[] = $value->foodMatch;
      $final_array['filters']['range'][$value->range] = $value->range;
      $final_array['filters']['wine_type'][$value->wineType] = $value->wineType;
      $final_array['filters']['varietals'][$value->grapeVariety] = $value->grapeVariety;
      $final_array['filters']['food_matches'][$value->foodMatch] = $new_array;
      $wine_details[$value->range][$value->id]['title'] = $value->title;
      $wine_details[$value->range][$value->id]['range'] = $value->range;
      $ids = \Drupal::entityQuery('node')
          ->condition('status', 1)
          ->condition('field_wine_id', $value->id)
          ->execute();
      $wine_image_url = '';
      if (count($ids)) {
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
    }
    $foodMatch = $this->getFoodMatchesFilter($food_matches);

    $final_array['filters']['food_matches'] = $foodMatch;


    $range_details = $final_array['range_details'];
    //print_r(array_values($range_details));
    //die('sat2');
	//print_r($final_array['filters']);exit;
    $indexed_range_details = array_values($range_details);
	$filters = $final_array['filters'];

    return array(
      '#theme' => 'sapient_our_wines_block',
      '#arguments' => $indexed_range_details,
	  '#filters' => $filters,
    );
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

  public function getFoodMatchesFilter($food_matches) {
    $unique_food_matches = array_unique($food_matches);



    foreach ($unique_food_matches as $uni_food_matches) {
      $first_level[] = explode(", ", $uni_food_matches);
    }
    foreach ($first_level as $first_lev) {
      foreach ($first_lev as $lev) {
        $all_level[] = explode(":", $lev);
      }
    }
    foreach ($all_level as $all_lev) {
      if ($all_lev[0]) {
        if (!in_array($all_lev[1], $new_array[$all_lev[0]])) {
          $new_array[$all_lev[0]][] = $all_lev[1];
        }
      }
    }
    return $new_array;
  }

}
