<?php

/**
 * @file
 * Contains \Drupal\pr_ctbuy_connector\Controller\RemotekeyAutocompleteController.
 */

namespace Drupal\pr_ctbuy_connector\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Class RemotekeyAutocompleteController.
 *
 * @package Drupal\pr_ctbuy_connector\Controller
 */
class RemotekeyAutocompleteController extends ControllerBase {

  /**
   * Request stack.
   *
   * @var RequestStack
   */
  public $request;

  /**
   * Class constructor.
   *
   * @param RequestStack $request
   *   Request stack.
   */
  public function __construct(RequestStack $request) {
    $this->request = $request;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    // Instantiates this form class.
    return new static(
        // Load the service required to construct this class.
        $container->get('request_stack')
    );
  }

  /**
   * Autocomplete.
   *
   * @return string
   *   Return Hello string.
   */
  public function autocomplete() {
    $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
    $string = $this->request->getCurrentRequest()->get('q');
    $string = strlen($string) ? trim($string) : '';
    $data = array();
    // All the checks have already been done to this point, we can directly query
    // the console.
    $endpoint_url = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_endpoint');
    $api_key = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_key');
    //    $use_curl = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_use_curl');
    $use_curl = 1;
    $instance_pairs = $this->getInstancePairs();
    if ($instance_pairs && $instance_pairs[$language]) {
      $instance = $instance_pairs[$language];
    }
    if ($instance && $string && $use_curl) {
      $endpoint_url .= '/GetListForInstance/?instance=' . $instance . '&search=' . $string;
      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $endpoint_url);
      curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 15);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('api_key: ' . $api_key));
      curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
      curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      // Bypass SSL checking.
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
      $data = curl_exec($ch);
      $error = curl_error($ch);
      curl_close($ch);
      $data = json_decode($data);
      foreach ($data as $key => $value) {
        $results[] = [
          'value' => $key,
          'label' => $value,
        ];
      }
    }
    else {
      $results = array(array('value' => 0, 'label' => 'No instance code found. Online Shop doesnt exists for this market. '));
    }
    return new JsonResponse($results);
  }

  public function getInstancePairs() {
    $instance_pairs = array();
    $instances = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_instances');
    $instances_array = explode(',', $instances);
    foreach ($instances_array as $instance_details) {
      $instance_details = trim($instance_details);
      $instance_array = explode('|', $instance_details);
      if (trim($instance_array[1])) {
        $instance_pairs[$instance_array[0]] = trim($instance_array[1]);
      }
    }
    return $instance_pairs;
  }
}
