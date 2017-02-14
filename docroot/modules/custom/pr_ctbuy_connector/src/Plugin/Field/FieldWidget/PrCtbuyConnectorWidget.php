<?php

namespace Drupal\pr_ctbuy_connector\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;

/**
 * Plugin implementation of the 'pr_ctbuy_connector' widget.
 *
 * @FieldWidget(
 *   id = "pr_ctbuy_connector",
 *   module = "pr_ctbuy_connector",
 *   label = @Translation("Default widget - Click to Buy"),
 *   field_types = {
 *     "pr_ctbuy_connector"
 *   }
 * )
 */
class PrCtbuyConnectorWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $endpoint_url = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_endpoint');
    $api_key = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_key');
    // Exit if not configured
    if ($endpoint_url === NULL || $api_key === NULL) {
      $element['#markup'] = t("The click to buy Module is not properly configured, please check it here: admin/config/prctbuyconnector");
      return $element;
    }
    // Construct the widget
    $element += array(
      '#type' => 'fieldset',
    );
    //$required = $element['#required'];

    $element['remote_key'] = array(
      '#title' => t('Click to buy Console, Remote Key'),
      '#type' => 'textfield',
      '#required' => TRUE,
      //#autocomplete_route_name' => 'pr_ctbuy_connector.remote_key_autocomplete',
      //'#autocomplete_route_parameters' => array(),
      // use #default_value to prepopulate the element
      // with the current saved value
       '#default_value' => isset($items[$delta]->remote_key) ? $items[$delta]->remote_key : null,
        //'#default_value' => isset($item['remote_key']) ? $item['remote_key'] : '',
    );

    $element['title'] = array(
      '#title' => t('Click to buy Console, text of the CTA'),
      '#type' => 'textfield',
      '#required' => TRUE,
      // use #default_value to prepopulate the element
      // with the current saved value
       '#default_value' => isset($items[$delta]->title) ? $items[$delta]->title : null,
        // '#default_value' => isset($item['title']) ? $item['title'] : '',
    );
    return array('value' => $element);
  }

}
