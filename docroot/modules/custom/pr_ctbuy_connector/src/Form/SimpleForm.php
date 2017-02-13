<?php

namespace Drupal\pr_ctbuy_connector\Form;


use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

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

    $form['pr_ctbuy_connector_instance'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - Instance Code'),
      '#description' => $this->t('The code of the instance this website (language sensitive) must connect to.'),
	  '#required' => TRUE,
    ];
	$form['pr_ctbuy_connector_lang'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - Language'),
      '#description' => $this->t('The language code.'),
	  '#required' => TRUE,
    ];
	$form['pr_ctbuy_connector_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - Key'),
      '#description' => $this->t('The API KEY for connecting to the console.'),
	  '#required' => TRUE,
    ];
	$form['pr_ctbuy_connector_endpoint'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - EndPoint URL'),
      '#description' => $this->t('The URL of the EndPoint.'),
	  '#required' => TRUE,
    ];
	$form['pr_ctbuy_connector_sdk'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Click to buy Console - SDK Source URL'),
      '#description' => $this->t('The URL for the JS SDK file. Leave empty if on the Endpoints domain'),
	  '#required' => FALSE,
    ];
	$form['pr_ctbuy_connector_no_geoloc'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Click to buy Console - Disable Geolocalization'),
      '#description' => $this->t('You can choose to disable GeoIp2 Geolocalization.'),
      '#required' => FALSE,
    ];
	$form['pr_ctbuy_connector_use_curl'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Click to buy Console - Use cURL'),
      '#description' => $this->t('In some specific cases you may need to use cURL to access the click to buy console.'),
      '#required' => FALSE,
    ];

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
  public function submitForm(array &$form, FormStateInterface $form_state) {
    /*
     * This would normally be replaced by code that actually does something
     * with the title.
     */
    $instance = $form_state->getValue('pr_ctbuy_connector_instance');
    drupal_set_message(t('You specified a instance of %instance.', ['%instance' => $instance]));
  }

}
