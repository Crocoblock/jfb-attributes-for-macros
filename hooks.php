<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

// Actions
add_action( 'wp_enqueue_scripts', 'jet_fb_attr_for_macro_register_scripts' );
add_action( 'jet_plugins/frontend/register_scripts', 'jet_fb_attr_for_macro_register_scripts' );

// Filters
add_filter( 'jet-form-builder/before-start-form', 'jet_fb_attr_for_macro_before_render_form' );
add_filter( 'jet-form-builder/frontend-settings', 'jet_fb_attr_for_macro_modify_frontend_config' );
