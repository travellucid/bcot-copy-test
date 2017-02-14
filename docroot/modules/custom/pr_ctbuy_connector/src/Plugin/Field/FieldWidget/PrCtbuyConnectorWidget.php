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
    //print "here" . $endpoint_url; exit;
    //$element['#markup'] = t("The click to buy Module is not properly configured, please check it" . $endpoint_url);
    // Exit if not configured
    if ($endpoint_url === NULL || $api_key === NULL) {
      $element['#markup'] = t("The click to buy Module is not properly configured, please check it here: !url", array('!url' => 'admin/config/prctbuyconnector'));
      return $element;
    }


    $value = isset($items[$delta]->value) ? $items[$delta]->value : '';
    // Construct the widget
    $element += array(
      '#type' => 'fieldset',
    );
    $required = $element['#required'];
  
    $element['remote_key'] = array(
      '#title' => t('Click to buy Console, Remote Key'),
      '#type' => 'textfield',
      '#required' => $required,
      '#autocomplete_route_name' => 'pr_ctbuy_connector.remote_key_autocomplete',
      '#autocomplete_route_parameters' => array(),
      // use #default_value to prepopulate the element
      // with the current saved value
      '#default_value' => isset($item['remote_key']) ? $item['remote_key'] : '',
    );

    $element['title'] = array(
      '#title' => t('Click to buy Console, text of the CTA'),
      '#type' => 'textfield',
      '#required' => $required,
      // use #default_value to prepopulate the element
      // with the current saved value
      '#default_value' => isset($item['title']) ? $item['title'] : '',
    );
    return array('value' => $element);
  }

  /**
   * Validate the color text field.
   */
  public function validate($element, FormStateInterface $form_state) {
    $value = $element['#value'];
    if (strlen($value) == 0) {
      $form_state->setValueForElement($element, '');
      return;
    }
    if (!preg_match('/^#([a-f0-9]{6})$/iD', strtolower($value))) {
      $form_state->setError($element, t("Color must be a 6-digit hexadecimal value, suitable for CSS."));
    }
  }

}
