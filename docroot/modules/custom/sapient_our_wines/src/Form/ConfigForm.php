<?php

namespace Drupal\sapient_our_wines\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Form\ConfigFormBase;

/**
 * Implements the ConfigForm form controller.
 *
 * This example demonstrates a simple form with a singe text input element. We
 * extend FormBase which is the simplest form base class used in Drupal.
 *
 * @see \Drupal\Core\Form\FormBase
 */
class ConfigForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'sapient_our_wines.settings',
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
    $vc = $this->config('sapient_our_wines.settings');
    $form = array();

    $form['openweatherapi_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Open weather API Key'),
      '#default_value' => $vc->get('openweatherapi_key'),
      '#description' => $this->t('Open weather API Key'),
      '#required' => TRUE,
    ];
    $form['dch_endpoint_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DCH endpoint URL'),
      '#default_value' => $vc->get('dch_endpoint_url'),
      '#description' => $this->t('DCH endpoint URL'),
      '#required' => TRUE,
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
    return 'sapient_our_wines_config_form';
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
    $config = \Drupal::configFactory()->getEditable('sapient_our_wines.settings');
    $config
        ->set('openweatherapi_key', $form_state->getValue('openweatherapi_key'))
        ->set('dch_endpoint_url', $form_state->getValue('dch_endpoint_url'))
        ->save();
    drupal_set_message('Settings have been saved.');
  }

}
