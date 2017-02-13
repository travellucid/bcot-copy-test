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
 *   default_widget = "pr_ctbuy_connector",
 *   default_formatter = "pr_ctbuy_connector_simple_text"
 * )
 */
 
 class PrCtbuyConnectorItem extends FieldItemBase {
  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return array(
      'columns' => array(
        'value' => array(
          'type' => 'text',
          'size' => 'tiny',
          'not null' => FALSE,
        ),
      ),
    );
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = $this->get('value')->getValue();
    return $value === NULL || $value === '';
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['value'] = DataDefinition::create('string')
      ->setLabel(t('Hex value'));

    return $properties;
  }

}
