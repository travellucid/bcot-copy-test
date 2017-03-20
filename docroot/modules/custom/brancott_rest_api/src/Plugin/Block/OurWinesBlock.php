<?php

/**
 * @file
 * Contains \Drupal\brancott_our_wines\Plugin\Block\OurWinesBlock.
 */

namespace Drupal\brancott_our_wines\Plugin\Block;

use Drupal\Core\Database\Database;
use Drupal\Core\Block\BlockBase;
use Drupal\taxonomy\Entity\Term;
use Drupal\taxonomy\TermInterface;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Template\TwigEnvironment;

/**
 * Provides a 'our_wines_carousel' block.
 *
 * @Block(
 *   id = "our_wines_carousel_block_homepage",
 *   admin_label = @Translation("Our wines carousel Block Homepage"),
 *   category = @Translation("Custom blocks")
 * )
 */
class OurWinesBlock extends BlockBase implements BlockPluginInterface
{

    /**
   * {@inheritdoc}
   */
    public function build() 
    {
			$ch = curl_init("http://gateway.pernod-ricard-winemakers.com/brancott%20estate/ranges"); // add your url which contains json file
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			$content = curl_exec($ch);
			curl_close($ch);
			$json = json_decode($content, true);
			//print_R($json);
			$count = count($json);
			$names = array();
	// print $count; exit;
			foreach($json as $js){
					$names[] = $js['name'];
     
			}
            
		    return array(
                    '#theme' => 'brancott_our_wines_template',
                    '#names' => $names,
					'#count' => $count,
                    ); 
  
    }	 
}
