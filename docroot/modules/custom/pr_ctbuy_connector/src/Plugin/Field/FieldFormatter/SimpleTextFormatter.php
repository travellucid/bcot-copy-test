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
 *     "pr_ctbuy_connector"
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
        // We create a render array to produce the desired markup,
        // "<p style="color: #hexcolor">The color code ... #hexcolor</p>".
        // See theme_html_tag().
        '#type' => 'html_tag',
        '#tag' => 'p',
        '#attributes' => array(
          'style' => 'color: ' . $item->value,
        ),
        '#value' => $this->t('The color code in this field is @code', array('@code' => $item->value)),
      );
    }

    return $elements;
  }

}
