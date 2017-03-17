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
    $form['dch_details'] = array(
      '#type' => 'fieldset',
      '#title' => t('DCH configurations'),
      '#open' => TRUE, // Added
    );
    $form['dch_details']['dch_wine_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DCH Gateway Endpoint URL'),
      '#default_value' => $vc->get('dch_wine_url'),
      '#description' => $this->t('DCH Wines URL'),
      '#required' => TRUE,
    ];

    $form['dch_details']['dch_ranges_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DCH Ranges URL'),
      '#default_value' => $vc->get('dch_ranges_url'),
      '#description' => $this->t('DCH Ranges URL'),
      '#required' => TRUE,
    ];

    $form['dch_details']['dch_pp_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DCH Privacy Policy URL'),
      '#default_value' => $vc->get('dch_pp_url'),
      '#description' => $this->t('DCH Privacy Policy URL'),
      '#required' => TRUE,
    ];

    $form['dch_details']['dch_tu_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DCH Term of Use URL'),
      '#default_value' => $vc->get('dch_tu_url'),
      '#description' => $this->t('DCH Term of Use URL'),
      '#required' => TRUE,
    ];
    $form['dch_details']['dch_legal_url'] = [
      '#type' => 'textfield',
      '#title' => $this->t('DCH Legal URL'),
      '#default_value' => $vc->get('dch_legal_url'),
      '#description' => $this->t('DCH Legal URL'),
      '#required' => TRUE,
    ];
    $form['dch_details']['cache_ttl'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Cache Lifetime'),
      '#default_value' => $vc->get('cache_ttl'),
      '#description' => $this->t('Cache Lifetime in second'),
      '#required' => TRUE,
    ];
    // Age gate component.
    $form['age_gate'] = array(
      '#type' => 'fieldset',
      '#title' => t('Age gate Configurations'),
      '#open' => TRUE, // Added
    );
    $form['age_gate']['facebook_app_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Facebook App Id'),
      '#default_value' => $vc->get('facebook_app_id'),
      '#description' => $this->t('Facebook App Id for Age gate authentication'),
      '#required' => TRUE,
    ];
    // Click to Buy component.
    $form['click_to_buy'] = array(
      '#type' => 'fieldset',
      '#title' => t('Click to Buy Brancott specific settings'),
      '#open' => TRUE, // Added
    );
    $form['click_to_buy']['click_to_buy_instances'] = array(
      '#type' => 'textarea',
      '#title' => t('Click to Buy Instances'),
      '#default_value' => $vc->get('click_to_buy_instances'),
      '#description' => t('Please follow the exact format without spaces:  <b>key|code,key|code,key|code</b>. Key would be locale and Value woul dbe Instance ID.'),
    );
    // Salesforce component
    $form['salesforce_credentials'] = array(
      '#type' => 'fieldset',
      '#title' => t('Salesforce Integration settings'),
      '#open' => TRUE, // Added
    );
    $form['salesforce_credentials']['business_unit'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Business Unit'),
      '#default_value' => $vc->get('business_unit'),
      '#required' => TRUE,
    ];
    $form['salesforce_credentials']['client_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Client ID'),
      '#default_value' => $vc->get('client_id'),
      '#required' => TRUE,
    ];
    $form['salesforce_credentials']['client_secret'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Client Secret'),
      '#default_value' => $vc->get('client_secret'),
      '#required' => TRUE,
    ];
    $form['salesforce_credentials']['data_extension'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Data Extension'),
      '#default_value' => $vc->get('data_extension'),
      '#required' => TRUE,
    ];
    $form['salesforce_credentials']['external_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('External Key'),
      '#default_value' => $vc->get('external_key'),
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
        ->set('dch_wine_url', $form_state->getValue('dch_wine_url'))
        ->set('dch_ranges_url', $form_state->getValue('dch_ranges_url'))
//        ->set('dch_all_wines_url', $form_state->getValue('dch_all_wines_url'))
        ->set('dch_pp_url', $form_state->getValue('dch_pp_url'))
        ->set('dch_tu_url', $form_state->getValue('dch_tu_url'))
        ->set('dch_legal_url', $form_state->getValue('dch_legal_url'))
        ->set('cache_ttl', $form_state->getValue('cache_ttl'))
        ->set('facebook_app_id', $form_state->getValue('facebook_app_id'))
        ->set('click_to_buy_instances', $form_state->getValue('click_to_buy_instances'))
        ->set('business_unit', $form_state->getValue('business_unit'))
        ->set('client_id', $form_state->getValue('client_id'))
        ->set('client_secret', $form_state->getValue('client_secret'))
        ->set('data_extension', $form_state->getValue('data_extension'))
        ->set('external_key', $form_state->getValue('external_key'))
        ->save();
    drupal_set_message('Settings have been saved.');
  }

}
