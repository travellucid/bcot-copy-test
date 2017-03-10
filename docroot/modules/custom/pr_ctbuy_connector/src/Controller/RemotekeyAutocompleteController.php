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
    $string = $this->request->getCurrentRequest()->get('q');
    $data = array();
    // All the checks have already been done to this point, we can directly query
    // the console.
    $endpoint_url = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_endpoint');
    $api_key = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_key');
    //Todo: Use instance code 
    $instance = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_instance');
    
    $use_curl = \Drupal::config('pr_ctbuy_connector.settings')->get('pr_ctbuy_connector_use_curl');


    $endpoint_url .= '/GetListForInstance/?instance=' . $instance . '&search=' . $string;

    if ($string && $use_curl) {
      //print $endpoint_url; exit;
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
      //print_r($data); exit;
      foreach ($data as $key => $value) {
        //print "aaaaa";
        
        $results[] = [
          'value' => $key,
          'label' => $value,
        ];
      }
      //print_r($results); exit;
    }
    else {
//      $options = array(
//        'method' => 'GET',
//        'timeout' => 15,
//        'headers' => array(
//          'api_key' => $api_key,
//        ),
//      );
//
//      try {
//        $response = \Drupal::httpClient()->get($endpoint_url, array('headers' => array('Accept' => 'text/plain')));
//        $data = (string) $response->getBody();
//        if (empty($data)) {
//          return FALSE;
//        }
//      }
//      catch (RequestException $e) {
//        return FALSE;
//      }
//
//      $data = $result->data;
    }
    //$data = str_replace("world","Peter","Hello world!");
    //$data[] = ['value' => 'termvalue', 'label' => 'termname'];
    //print_r($data); exit;
//    $data = json_decode($data);
//    return JsonResponse::create($data);
    return new JsonResponse($results);
  }

}