<?php

/**
 * @file
 * Contains \Drupal\language_access\LanguageAccessEventSubscriber.
 */

namespace Drupal\access_country_language\EventSubscriber;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\EventDispatcher\Event;
use Symfony\Component\HttpKernel\KernelEvents;
use Drupal\language\ConfigurableLanguageManager;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Drupal\Core\Url;

/**
 * Class LanguageAccessEventSubscriber.
 *
 * @package Drupal\language_access
 */
class LanguageAccessEventSubscriber implements EventSubscriberInterface {

  /**
   * @var ConfigurableLanguageManager
   */
  protected $languageManager;

  /**
   * @var RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * @var AccountInterface
   */
  private $account;

  /**
   * Constructor.
   * @param ConfigurableLanguageManager $language_manager
   * @param RouteMatchInterface $route_match
   * @param AccountInterface $account
   */
  public function __construct(ConfigurableLanguageManager $language_manager, RouteMatchInterface $route_match, AccountInterface $account) {
    $this->languageManager = $language_manager;
    $this->routeMatch = $route_match;
    $this->account = $account;
  }

  /**
   * {@inheritdoc}
   */
  static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST] = ['checkForLanguageAccess'];
    return $events;
  }

  /**
   * This method is called whenever the kernel.request event is
   * dispatched.
   */
  public function checkForLanguageAccess() {
    $currentLanguage = $this->languageManager->getCurrentLanguage();
    $id = $currentLanguage->getId();
    
    //print_r($this->account->hasPermission('access language ' . $id));die;
    if (!$this->account->hasPermission('access language ' . $id)) {
      
        $route = $this->routeMatch->getRouteName();
      
      //print_r($route);
        //    print_r($id);die;

      if ($route == 'user') {
        return;
      }

      // Check if current language is different from the default language
      $defaultLanguage = $this->languageManager->getDefaultLanguage();
      $url = Url::fromRouteMatch($this->routeMatch);
      $check_node_add = $url->getRouteName();
      //print_r($check_node_add);die;
      if ($id != $defaultLanguage->getId() || $check_node_add == 'node.add' || $check_node_add == 'entity.taxonomy_vocabulary.add_form') {
        // Redirect to current route in default language
        if(\Drupal::currentUser()->isAnonymous()){
          $logged = 0;
        }
        else{
          $logged = 1;
        }
        if($logged == 1){
        $url = Url::fromRouteMatch($this->routeMatch);
        $url->setOption('language', $defaultLanguage);
        $response = new RedirectResponse('/system/403');
        $response->send();
        }
      }
    }

  }

}
