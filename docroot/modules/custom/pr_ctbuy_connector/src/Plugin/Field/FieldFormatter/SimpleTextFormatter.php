<?php

namespace Drupal\pr_ctbuy_connector\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'pr_ctbuy_connector_simple_text' formatter.
 *
 * @FieldFormatter(
 *   id = "pr_ctbuy_connector_simple_text",
 *   module = "pr_ctbuy_connector",
 *   label = @Translation("Default CTA - Click to buy"),
 *   field_types = {
 *     "remote_key"
 *     "title"
 *   }
 * )
 */
class SimpleTextFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = array();

    foreach ($items as $delta => $item) {
      $elements[$delta] = array(
        '#type' => 'html_tag',
        '#tag' => 'p',
        '#value' => $this->t('The remote key  in this field is @code and title is @title', array('@code' => $item->remote_key, '@title' => $item->title)),
      );
    }

    return $elements;
  }

}
