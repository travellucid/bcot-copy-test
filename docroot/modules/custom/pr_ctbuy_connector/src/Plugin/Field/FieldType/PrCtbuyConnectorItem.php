<?php

namespace Drupal\pr_ctbuy_connector\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;


/**
 * Plugin implementation of the 'pr_ctbuy_connector' field type.
 *
 * @FieldType(
 *   id = "pr_ctbuy_connector",
 *   label = @Translation("Click to buy Console: CTA "),
 *   module = "pr_ctbuy_connector",
 *   description = @Translation("Create a call to action link based on a remote product on the click to buy console."),
 *   default_widget = "PrCtbuyConnectorWidget",
 *   default_formatter = "SimpleTextFormatter"
 * )
 */
 
 class PrCtbuyConnectorItem extends FieldItemBase {
  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
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
   * {@inheritdoc}
   */
  public function isEmpty() {
    $isEmpty = 
      empty($this->get('remote_key')->getValue());
      empty($this->get('title')->getValue());
    return $isEmpty;
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = [];
    $properties['remote_key'] = DataDefinition::create('string')
      ->setLabel(t('Remote Key'));
    $properties['title'] = DataDefinition::create('string')
      ->setLabel(t('Title'));

    return $properties;
  }

}
