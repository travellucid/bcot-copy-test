<?php

namespace Drupal\pr_ctbuy_connector\Plugin\Field\FieldWidget;

use Drupal;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'PrCtbuyConnectorDefaultWidget' widget.
 *
 * @FieldWidget(
 *   id = "PrCtbuyConnectorDefaultWidget",
 *   label = @Translation("Default widget - Click to Buy"),
 *   field_types = {
 *     "PrCtbuyConnector"
 *   }
 * )
 */
class PrCtbuyConnectorDefaultWidget extends WidgetBase {

  /**
   * Define the form for the field type.
   * 
   * Inside this method we can define the form used to edit the field type.
   * 
   * Here there is a list of allowed element types: https://goo.gl/XVd4tA
   */
  public function formElement(
    FieldItemListInterface $items,
    $delta, 
    Array $element, 
    Array &$form, 
    FormStateInterface $formState
  ) {

    // Remote Key

    $element['remote_key'] = [
      '#type' => 'textfield',
      '#title' => t('Click to buy Console, Remote Key'),
      '#autocomplete_route_name' => 'pr_ctbuy_connector.remote_key_autocomplete',
      '#autocomplete_route_parameters' => array(),
      // Set here the current value for this field, or a default value (or 
      // null) if there is no a value
      '#default_value' => isset($items[$delta]->remote_key) ? 
          $items[$delta]->remote_key : null,

      '#empty_value' => '',
      '#placeholder' => t('Remote Key'),
      '#required' => TRUE,
    ];

    // title
   /* $desc = "Drop Down Options<br>
<ul>
  <li>Buy No Popup - Use 'Click to Buy' below</li>
  <li>Internal Site Page - Use 'CTA' below</li>
  <li>External Site Page - Use 'CTA' below</li>
</ul>";*/
    $element['title'] = [
      '#type' => 'textfield',
      '#title' => t('Click to buy Console, text of the CTA'),
      '#default_value' => isset($items[$delta]->title) ? 
          $items[$delta]->title : 'BUY NOW',
      '#empty_value' => '',
      '#maxlength' => '20',
      '#placeholder' => t('Title'),
      '#required' => TRUE,
      '#description' => t('Maximum character limit : 20<br>'),
      
      
    ];

    return $element;
  }

} // class