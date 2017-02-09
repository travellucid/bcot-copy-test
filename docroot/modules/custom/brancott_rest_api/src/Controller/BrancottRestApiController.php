<?php

    /**
     * @file
     * Contains \Drupal\products\Controller\ProductsController.
     */
    namespace Drupal\brancott_rest_api\Controller;

    use Drupal\Core\Controller\ControllerBase;

    /**
     * Controller routines for products routes.
     */
    class BrancottRestApiController extends ControllerBase {

      /**
       * Callback function to get the data from REST API
       */
      public function getList() {

        $data = array();
        $response = $data = $result = null;

        $response = brancott_rest_api_reponse('http://gateway.pernod-ricard-winemakers.com/v2/brancott%20estate/nz/wines/1/en', 'GET');
		//print_r($response); exit;
        if ($response) {

          $result = json_decode($response);
          $data = array();

          // # add all the data in one multiple dim array
          $data['title'] = 'products to consume REST API';
          $data['users'] = $result;
		  $result =  (array) $result;
		  print_r($result); exit;
          // display the content in the middle section of the page
          $build = array(
            '#theme' => 'rest_content', // assign the theme [products-list.html.twig]
            '#title' => 'products to consume REST API', // assign the page title
            '#pagehtml' => 'data is coming from : products/list ', // assign the string message like this
            '#data' => $data
          ); // assign the array like this to access in twig file
        }
        return $build;
      }
    }
  ?>