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
    $path = \Drupal::request()->getpathInfo();
    $arg = explode('/', $path);
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
    if ($arg[2] == 'our-wines') {
      $range_name = $arg[3];
    }
    elseif ($arg[1] == 'our-wines') {
      $range_name = $arg[2];
    }

    foreach ($values as $value) {
      $first_level = array();
      $all_level = array();
      $food_matches[] = $value->foodMatch;
      $final_array['filters']['range'][$value->range] = $value->range;
      $final_array['filters']['wine_type'][$value->wineType] = $value->wineType;
      $final_array['filters']['varietals'][$value->grapeVariety] = $value->grapeVariety;

      $final_array['filters']['food_matches'][$value->foodMatch] = $new_array;

      $ids = \Drupal::entityQuery('node')
          ->condition('status', 1)
          ->condition('field_wine_id', $value->id)
          ->execute();
      $array_nids = array_values($ids);
      $new_nid = $array_nids[0];
      $ids_bkg = \Drupal::entityQuery('node')
          ->condition('status', 1)
          ->condition('title', $value->range)
          ->execute();
      $bkg_array_nids = array_values($ids_bkg);
      $bkg_nid = $bkg_array_nids[0];
      if ($bkg_nid) {
        $bkg_color = \Drupal\node\Entity\Node::load($bkg_nid);
        $bkg_color = $bkg_color->field_ranges_background_color->value;
      }
      $wine_image_url = '';
      if ($new_nid) {
        $wine_node_details = \Drupal\node\Entity\Node::load($new_nid);
        $wine_file_id = $wine_node_details->field_wine_bottle_image->target_id;

        $wine_image_file = \Drupal\file\Entity\File::load($wine_file_id);
        if ($wine_image_file) {
          $wine_image_url = file_create_url($wine_image_file->getFileUri());
        }
      }
      if ($wine_image_url) {
        $wine_details[$value->range][$value->id]['url'] = $wine_image_url; //url
        $wine_details[$value->range][$value->id]['bkg_colr'] = $bkg_color; //bkgcolr
        $wine_details[$value->range][$value->id]['nid'] = $new_nid; //nid
        $wine_details[$value->range][$value->id]['title'] = $value->title; //title
        $wine_details[$value->range][$value->id]['range'] = $value->range; //range
      }
      //print_r($wine_details[$value->range][$value->id]['url']);die;

      $range_details = $this->getRangeDetails($value->range);
      if (!empty($range_name) && strtolower($range_name) != strtolower($value->range)) {
        continue;
      }
      else {
        $range_details['associated_wines'] = $wine_details[$value->range];
      }

      $final_array['range_details'][$value->range] = $range_details;
    }

    foreach ($final_array['filters']['varietals'] as $varietal) {
      $final_array_varietals[] = explode(", ", $varietal);
    }

    $newvarietals = array();
    foreach ($final_array_varietals as $varietals) {
      foreach ($varietals as $key => $value) {
        $newvarietals[$value] = $value;
      }
    }

    foreach ($final_array['filters']['wine_type'] as $winetype) {
      $final_array_winetypes[] = explode(", ", $winetype);
    }

    $newwinetypes = array();
    foreach ($final_array_winetypes as $type) {
      foreach ($type as $key => $value) {
        $newwinetypes[$value] = $value;
      }
    }
    $final_array['filters']['wine_type'] = $newwinetypes;
    $final_array['filters']['varietals'] = $newvarietals;
    $foodMatch = $this->getFoodMatchesFilter($food_matches);

    $final_array['filters']['food_matches'] = $foodMatch;


    $range_details = $final_array['range_details'];
    $indexed_range_details = array_values($range_details);
    $filters = $final_array['filters'];
    foreach ($indexed_range_details as $indexed_range_detail) {
      //print_r($indexed_range_detail['associated_wines']);die;
      if ($indexed_range_detail['associated_wines'] != '') {
        $index_details[] = $indexed_range_detail;
      }
    }
    //print_r($index_details);die;
    return array(
      '#theme' => 'sapient_our_wines_block',
      '#arguments' => $index_details,
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
        $values_range->description = "some text will go here which will be more than 40 characters. This will be divided into 2 sections";
        if (strlen($values_range->description) > 40) {
          $first = substr($values_range->description, 0, 40);
          $second = substr($values_range->description, 40);
          $range_details['description'] = '<span>' . $first . '<span class="ellipses">...</span></span><a href="#" class="see-more">See More</a><span class="extra-text">' . $second . '</span><a href="#" class="see-less">See Less</a>';
        }
        else {
          $range_details['description'] = '<span>' . $values_range->description . '</span>';
        }

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
