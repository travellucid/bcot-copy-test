<?php

namespace Drupal\sapient_frontend\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class SapientController.
 *
 * @package Drupal\sapient_frontend\Controller
 */
class SapientController extends ControllerBase {

 /**
   * Dummy2.
   *
   * @return string
   *   Return Hello string.
   */
    public function dummy() {
     $rendereddata = 'component1';
	return array(
          '#theme' => 'sapient_frontend',
          '#arguments' => $rendereddata,
        );  
}
  
  public function dummy1() {
 $rendereddata = 'component1';
        return array(
          '#theme' => 'sapient_frontend-1',
          '#arguments' => $rendereddata,
        );
}  
/**
   * Dummy2.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy2() {
 $rendereddata = 'component2';
        return array(
          '#theme' => 'sapient_frontend-2',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy3.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy3() {
 $rendereddata = 'component3';
        return array(
          '#theme' => 'sapient_frontend-3',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy4.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy4() {
 $rendereddata = 'component4';
        return array(
          '#theme' => 'sapient_frontend-4',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy5.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy5() {
 $rendereddata = 'component5';
        return array(
          '#theme' => 'sapient_frontend-5',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy6.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy6() {
 $rendereddata = 'component6';
        return array(
          '#theme' => 'sapient_frontend-6',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy7.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy7() {
 $rendereddata = 'component7';
        return array(
          '#theme' => 'sapient_frontend-7',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy8.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy8() {
 $rendereddata = 'component8';
        return array(
          '#theme' => 'sapient_frontend-8',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy9.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy9() {
 $rendereddata = 'component9';
        return array(
          '#theme' => 'sapient_frontend-9',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy10.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy10() {
 $rendereddata = 'component10';
        return array(
          '#theme' => 'sapient_frontend-10',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Dummy11.
   *
   * @return string
   *   Return Hello string.
   */
  public function dummy11() {
 $rendereddata = 'component11';
        return array(
          '#theme' => 'sapient_frontend-11',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Main Header.
   *
   * @return string
   *   Return Hello string.
   */
  public function mainHeader() {
 $rendereddata = 'componentHeader';
        return array(
          '#theme' => 'sapient-main-header',
          '#arguments' => $rendereddata,
        );
  
}
  /**
   * Footer.
   *
   * @return string
   *   Return Hello string.
   */
  public function footer() {
 $rendereddata = 'componentFooter';
        return array(
          '#theme' => 'sapient-footer',
          '#arguments' => $rendereddata,
        );
  
}

/**
   * Diapormama.
   *
   * @return string
   *   Return Hello string.
   */
  public function diaporama() {
 $rendereddata = 'componentDiaporama';
        return array(
          '#theme' => 'sapient-diaporama',
          '#arguments' => $rendereddata,
        );
  
}

/**
   * BrandDNA.
   *
   * @return string
   *   Return Hello string.
   */
  public function brandDNA() {
 $rendereddata = 'componentbrandDNA';
        return array(
          '#theme' => 'sapient-brandDNA',
          '#arguments' => $rendereddata,
        );
  
}
	
/**
   * BrandDNA.
   *
   * @return string
   *   Return Hello string.
   */
  public function competitionEvents() {
 $rendereddata = 'componentCompetitionEvents';
        return array(
          '#theme' => 'sapient-competition-events',
          '#arguments' => $rendereddata,
        );
  
}

/**
   * View On Map
   *
   * @return string
   *   Return Hello string.
   */
  public function viewOnMap() {
 $rendereddata = 'componentviewOnMap';
        return array(
          '#theme' => 'sapient-viewOnMap',
          '#arguments' => $rendereddata,
        );
  
}

/**
   * News Push List
   *
   * @return string
   *   Return Hello string.
   */
  public function newsPushList() {
 $rendereddata = 'componentnewsPushList';
        return array(
          '#theme' => 'sapient-newsPushList',
          '#arguments' => $rendereddata,
        );
  
}

/**
 * BodyProductTile.
 *
 * @return string
 *   Return Hello string.
 */
public function bodyProductTile() {
	$rendereddata = 'componentBodyProductTile';
	return array(
			'#theme' => 'sapient-body-product-tile',
			'#arguments' => $rendereddata,
	);

}

/**
 * BodyEmbed.
 *
 * @return string
 *   Return Hello string.
 */
public function bodyEmbed() {
	$rendereddata = 'componentBodyEmbed';
	return array(
			'#theme' => 'sapient-body-embed',
			'#arguments' => $rendereddata,
	);
}

/**
 * BodyDiaporama.
 *
 * @return string
 *   Return Hello string.
 */
public function bodyDiaporama() {
	$rendereddata = 'componentBodyDiaporama';
	return array(
			'#theme' => 'sapient-body-diaporama',
			'#arguments' => $rendereddata,
	);
}

/**
 * Manufacturing.
 *
 * @return string
 *   Return Hello string.
 */
public function manufacturing() {
	$rendereddata = 'componentmanufacturing';
	return array(
			'#theme' => 'sapient-manufacturing',
			'#arguments' => $rendereddata,
	);
}

/**
 * Introductive Title.
 *
 * @return string
 *   Return Hello string.
 */
public function introductiveTitle() {
	$rendereddata = 'componentintroductiveTitle';
	return array(
			'#theme' => 'sapient-introductiveTitle',
			'#arguments' => $rendereddata,
	);
}

/**
 * SiteMap.
 *
 * @return string
 *   Return Hello string.
 */
public function sitemap() {
	$rendereddata = 'componentsitemap';
	return array(
			'#theme' => 'sapient-sitemap',
			'#arguments' => $rendereddata,
	);
}


}
