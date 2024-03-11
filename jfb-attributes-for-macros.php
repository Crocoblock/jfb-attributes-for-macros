<?php
/**
 * Plugin Name: JetFormBuilder - additional attributes
 * Description: A lightweight addon for JetFormBuilder 3+ which add attributes for frontend macros
 * Version:     1.0.2
 * Author:      Crocoblock
 * Author URI:  https://crocoblock.com/
 * Text Domain: jfb-attributes-for-macros
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 * Domain Path: /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

const JET_FB_ATTRIBUTES_FOR_MACROS_SLUG = 'jfb-attributes-for-macros';

define( 'JET_FB_ATTRIBUTES_FOR_MACROS_VERSION', '1.0.2' );

define( 'JET_FB_ATTRIBUTES_FOR_MACROS__FILE__', __FILE__ );
define( 'JET_FB_ATTRIBUTES_FOR_MACROS_PLUGIN_BASE', plugin_basename( __FILE__ ) );
define( 'JET_FB_ATTRIBUTES_FOR_MACROS_PATH', plugin_dir_path( __FILE__ ) );
define( 'JET_FB_ATTRIBUTES_FOR_MACROS_URL', plugins_url( '/', __FILE__ ) );

add_action(
	'plugins_loaded',
	function () {

		if ( ! version_compare( PHP_VERSION, '7.0.0', '>=' ) ) {
			add_action(
				'admin_notices',
				function () {
					$class   = 'notice notice-error';
					$message = __(
						'<b>Error:</b> <b>JetFormBuilder Is Valid Inputs field</b> plugin requires a PHP version ">= 7.0"',
						'jfb-is-valid-inputs'
					);
					printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), wp_kses_post( $message ) );
				}
			);

			return;
		}

		require_once JET_FB_ATTRIBUTES_FOR_MACROS_PATH . 'functions.php';
		require_once JET_FB_ATTRIBUTES_FOR_MACROS_PATH . 'hooks.php';
	},
	100
);
