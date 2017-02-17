<?php

namespace Drupal\pr_ctbuy_connector\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\Field\FieldStorageDefinitionInterface as StorageDefinition;

/**
 * Plugin implementation of the 'PrCtbuyConnector' field type.
 *
 * @FieldType(
 *   id = "PrCtbuyConnector",
 *   label = @Translation("Click to buy Console : CTA"),
 *   description = @Translation("Create a call to action link based on a remote product on the click to buy console."),
 *   category = @Translation("Custom"),
 *   default_widget = "PrCtbuyConnectorDefaultWidget",
 *   default_formatter = "PrCtbuyConnectorDefaultFormatter"
 * )
 */
class PrCtbuyConnector extends FieldItemBase {

  /**
   * Field type properties definition.
   * 
   * Inside this method we defines all the fields (properties) that our 
   * custom field type will have.
   * 
   * Here there is a list of allowed property types: https://goo.gl/sIBBgO
   */
  public static function propertyDefinitions(StorageDefinition $storage) {

    $properties = [];

    $properties['remote_key'] = DataDefinition::create('string')
      ->setLabel(t('Remote Key'));

    $properties['title'] = DataDefinition::create('string')
      ->setLabel(t('Remote Kay'));

    return $properties;
  }

  /**
   * Field type schema definition.
   * 
   * Inside this method we defines the database schema used to store data for 
   * our field type.
   * 
   * Here there is a list of allowed column types: https://goo.gl/YY3G7s
   */
  public static function schema(StorageDefinition $storage) {

    $columns = [];
    $columns['remote_key'] = [
      'type' => 'char',
      'length' => 255,
    ];
    $columns['title'] = [
      'type' => 'char',
      'length' => 255,
    ];

    return [
      'columns' => $columns,
      'indexes' => [],
    ];
  }

  /**
   * Define when the field type is empty. 
   * 
   * This method is important and used internally by Drupal. Take a moment
   * to define when the field fype must be considered empty.
   */
  public function isEmpty() {

    $isEmpty = 
      empty($this->get('remote_key')->getValue()) &&
      empty($this->get('title')->getValue());

    return $isEmpty;
  }

} // class