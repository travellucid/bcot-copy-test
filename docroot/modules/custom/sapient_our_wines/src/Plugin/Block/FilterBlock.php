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
    $langcode = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $path = \Drupal::request()->getpathInfo();
    $arg = explode('/', $path);
    $rest_api = new BrancottRestApiControllerFilters();
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
      if(strlen($range_name)) {
        $range_name = str_replace("-", " ", $range_name);
      }
    }
    elseif ($arg[1] == 'our-wines') {
      $range_name = $arg[2];
      if(strlen($range_name)) {
        $range_name = str_replace("-", " ", $range_name);
      }
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


      $new_nid = reset($ids);
      if ($new_nid) {
        $con = \Drupal\Core\Database\Database::getConnection();
        $query = $con->select('node_field_data', 'n')->distinct();
        $query->fields('n', array('nid'));
        $query->condition('n.nid', $new_nid, '=');
        //$query->condition('n.langcode', $langcode, '=');
        $new_nid_transtion = $query->execute()->fetchField();

        $wine_image_url = '';
        if ($new_nid_transtion) {
          $wine_node_details = \Drupal\node\Entity\Node::load($new_nid_transtion);
          $wine_file_id = $wine_node_details->field_wine_bottle_image->target_id;

          $wine_image_file = \Drupal\file\Entity\File::load($wine_file_id);
          if ($wine_image_file) {
            $wine_image_url = file_create_url($wine_image_file->getFileUri());
          }


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


          if ($wine_image_url) {
            $wine_details[$value->range][$value->id]['url'] = $wine_image_url; //url
            $wine_details[$value->range][$value->id]['bkg_colr'] = $bkg_color; //bkgcolr
            $wine_details[$value->range][$value->id]['nid'] = $new_nid; //nid
            $wine_details[$value->range][$value->id]['title'] = $value->title; //title
            $wine_details[$value->range][$value->id]['range'] = $value->range; //range
          }
        }
      }

      $range_details = $this->getRangeDetails($value->range);
      if (!empty($range_name) && strtolower(urldecode($range_name)) != strtolower($value->range)) {
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
      if ($indexed_range_detail['associated_wines'] != '') {
        $index_details[] = $indexed_range_detail;
      }
    }
    return array(
      '#theme' => 'sapient_our_wines_block',
      '#arguments' => $index_details,
      '#filters' => $filters,
      '#current_language' => $langcode,
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
        if (strlen($values_range->description) > 40) {
          $first = substr($values_range->description, 0, 40);
          $second = substr($values_range->description, 40);
          $range_details['description'] = '<p>' . $first . '</p><a href="#" class="see-more">See More</a><p class="extra-text">' . $second . '</p><a href="#" class="see-less">See Less</a>';
        }
        else {
          $range_details['description'] = '<p>' . $values_range->description . '</p>';
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
