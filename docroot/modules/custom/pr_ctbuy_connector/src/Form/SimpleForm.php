<?php

namespace Drupal\pr_ctbuy_connector\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;

/**
 * Implements the SimpleForm form controller.
 *
 * This example demonstrates a simple form with a singe text input element. We
 * extend FormBase which is the simplest form base class used in Drupal.
 *
 * @see \Drupal\Core\Form\FormBase
 */
class SimpleForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'pr_ctbuy_connector.settings',
    ];
  }

  /**
   * Build the simple form.
   *
   * A build form method constructs an array that defines how markup and
   * other form elements are included in an HTML form.
   *
   * @param array $form
   *   Default form array structure.
   * @param FormStateInterface $form_state
   *   Object containing current form state.
   *
   * @return array
   *   The render array defining the elements of the form.
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $vc = $this->config('pr_ctbuy_connector.settings');
    $form = array();

//    $form['pr_ctbuy_connector_instance'] = [
//      '#type' => 'textfield',
//      '#title' => $this->t('Click to buy Console - Instance Code'),
//      '#default_value' => $vc->get('pr_ctbuy_connector_instance'),
//      '#description' => $this->t('The code of the instance this website (language sensitive) must connect to.'),
//      '#required' => TRUE,
//    ];
    $form['pr_ctbuy_connector_instances'] = array(
      '#type' => 'textarea',
      '#title' => t('Click to buy Console - Instance Codes'),
      '#default_value' => $vc->get('pr_ctbuy_connector_instances'),
      '#description' => t('The code of the instance this website (language sensitive) must connect to. Please follow the exact format without spaces:  <b>key|code,key|code,key|code</b>. Key would be locale and Value woul dbe Instance ID.'),
    );
    $form['pr_ctbuy_connector_lang'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - Language'),
      '#default_value' => $vc->get('pr_ctbuy_connector_lang'),
      '#description' => $this->t('The language code.'),
      '#required' => TRUE,
    ];
    $form['pr_ctbuy_connector_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - Key'),
      '#default_value' => $vc->get('pr_ctbuy_connector_key'),
      '#description' => $this->t('The API KEY for connecting to the console.'),
      '#required' => TRUE,
    ];
    $form['pr_ctbuy_connector_endpoint'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - EndPoint URL'),
      '#default_value' => $vc->get('pr_ctbuy_connector_endpoint'),
      '#description' => $this->t('The URL of the EndPoint.'),
      '#required' => TRUE,
    ];
    $form['pr_ctbuy_connector_sdk'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - SDK Source URL'),
      '#default_value' => $vc->get('pr_ctbuy_connector_sdk'),
      '#description' => $this->t('The URL for the JS SDK file. Leave empty if on the Endpoints domain'),
      '#required' => FALSE,
    ];
//    $form['pr_ctbuy_connector_no_geoloc'] = [
//      '#type' => 'checkbox',
//      '#title' => $this->t('Click to buy Console - Disable Geolocalization'),
//      '#description' => $this->t('You can choose to disable GeoIp2 Geolocalization.'),
//      '#default_value' => $vc->get('pr_ctbuy_connector_no_geoloc'),
//      '#required' => FALSE,
//    ];
//    $form['pr_ctbuy_connector_use_curl'] = [
//      '#type' => 'checkbox',
//      '#title' => $this->t('Click to buy Console - Use cURL'),
//      '#default_value' => $vc->get('pr_ctbuy_connector_use_curl'),
//      '#description' => $this->t('In some specific cases you may need to use cURL to access the click to buy console.'),
//      '#required' => FALSE,
//    ];

    // Group submit handlers in an actions element with a key of "actions" so
    // that it gets styled correctly, and so that other modules may add actions
    // to the form. This is not required, but is convention.
    $form['actions'] = [
      '#type' => 'actions',
    ];

    // Add a submit button that handles the submission of the form.
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Save Configuration'),
    ];

    return $form;
  }

  /**
   * Getter method for Form ID.
   *
   * The form ID is used in implementations of hook_form_alter() to allow other
   * modules to alter the render array built by this form controller.  it must
   * be unique site wide. It normally starts with the providing module's name.
   *
   * @return string
   *   The unique ID of the form defined by this class.
   */
  public function getFormId() {
    return 'pr_ctbuy_connector_simple_form';
  }

  /**
   * Implements form validation.
   *
   * The validateForm method is the default method called to validate input on
   * a form.
   *
   * @param array $form
   *   The render array of the currently built form.
   * @param FormStateInterface $form_state
   *   Object describing the current state of the form.
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $instance = $form_state->getValue('pr_ctbuy_connector_instance');
    if (strlen($instance) > 60) {
      // Set an error for the form element with a key of "title".
      $form_state->setErrorByName('instance', $this->t('The instace must be less than 60 characters.'));
    }
  }

  /**
   * Implements a form submit handler.
   *
   * The submitForm method is the default method called for any submit elements.
   *
   * @param array $form
   *   The render array of the currently built form.
   * @param FormStateInterface $form_state
   *   Object describing the current state of the form.
   */

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = \Drupal::configFactory()->getEditable('pr_ctbuy_connector.settings');
    $config
//        ->set('pr_ctbuy_connector_instance', $form_state->getValue('pr_ctbuy_connector_instance'))
        ->set('pr_ctbuy_connector_instances', $form_state->getValue('pr_ctbuy_connector_instances'))
        ->set('pr_ctbuy_connector_lang', $form_state->getValue('pr_ctbuy_connector_lang'))
        ->set('pr_ctbuy_connector_key', $form_state->getValue('pr_ctbuy_connector_key'))
        ->set('pr_ctbuy_connector_endpoint', $form_state->getValue('pr_ctbuy_connector_endpoint'))
        ->set('pr_ctbuy_connector_sdk', $form_state->getValue('pr_ctbuy_connector_sdk'))
//        ->set('pr_ctbuy_connector_no_geoloc', $form_state->getValue('pr_ctbuy_connector_no_geoloc'))
//        ->set('pr_ctbuy_connector_use_curl', $form_state->getValue('pr_ctbuy_connector_use_curl'))
        ->save();
    drupal_set_message('Settings have been saved.');
  }

}
