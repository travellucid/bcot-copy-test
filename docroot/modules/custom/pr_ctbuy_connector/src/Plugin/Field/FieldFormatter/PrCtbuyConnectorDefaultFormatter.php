<?php

namespace Drupal\pr_ctbuy_connector\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal;

/**
 * Plugin implementation of the 'PrCtbuyConnectorDefaultFormatter' formatter.
 *
 * @FieldFormatter(
 *   id = "PrCtbuyConnectorDefaultFormatter",
 *   label = @Translation("Default CTA - Click to buy"),
 *   field_types = {
 *     "PrCtbuyConnector"
 *   }
 * )
 */
class PrCtbuyConnectorDefaultFormatter extends FormatterBase {

  /**
   * Define how the field type is showed.
   * 
   * Inside this method we can customize how the field is displayed inside 
   * pages.
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {

    $elements = [];
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#type' => 'markup',
        '#markup' => $item->remote_key . ', ' . $item->title
      ];
    }

    return $elements;
  }
  
} // class