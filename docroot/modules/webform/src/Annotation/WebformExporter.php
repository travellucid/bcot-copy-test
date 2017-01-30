<?php

namespace Drupal\webform\Annotation;

use Drupal\Component\Annotation\Plugin;

/**
 * Defines a results exporter annotation object.
 *
 * Plugin Namespace: Plugin\WebformExporter.
 *
 * For a working example, see
 * \Drupal\webform\Plugin\WebformExporter\DelimitedText/WebformExporter
 *
 * @see hook_webform_exporter_info_alter()
 * @see \Drupal\webform\WebformExporterInterface
 * @see \Drupal\webform\WebformExporterBase
 * @see \Drupal\webform\WebformExporterManager
 * @see plugin_api
 *
 * @Annotation
 */
class WebformExporter extends Plugin {

  /**
   * The plugin ID.
   *
   * @var string
   */
  public $id;

  /**
   * The human-readable name of the results exporter.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $label;

  /**
   * The category in the admin UI where the block will be listed.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $category = '';

  /**
   * A brief description of the results exporter.
   *
   * This will be shown when adding or configuring this results exporter.
   *
   * @var \Drupal\Core\Annotation\Translation
   *
   * @ingroup plugin_translatable
   */
  public $description = '';

  /**
   * Generates zipped archive.
   *
   * @var bool
   */
  public $archive = FALSE;

  /**
   * Using export options.
   *
   * @var bool
   */
  public $options = TRUE;

}
