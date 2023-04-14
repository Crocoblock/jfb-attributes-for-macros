<?php

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die();
}

if ( ! function_exists( 'jet_fb_attr_for_macro_register_scripts' ) ) {
	function jet_fb_attr_for_macro_register_scripts() {
		wp_register_script(
			JET_FB_ATTRIBUTES_FOR_MACROS_SLUG,
			JET_FB_ATTRIBUTES_FOR_MACROS_URL . 'assets/js/frontend.js',
			array(
				\Jet_Form_Builder\Blocks\Manager::MAIN_SCRIPT_HANDLE,
			),
			JET_FB_ATTRIBUTES_FOR_MACROS_VERSION,
			true
		);
	}
}

if ( ! function_exists( 'jet_fb_attr_for_macro_enqueue_scripts' ) ) {
	function jet_fb_attr_for_macro_enqueue_scripts() {
		wp_enqueue_script( JET_FB_ATTRIBUTES_FOR_MACROS_SLUG );
	}
}

if ( ! function_exists( 'jet_fb_attr_for_macro_before_render_form' ) ) {
	function jet_fb_attr_for_macro_before_render_form( string $content ): string {
		jet_fb_attr_for_macro_enqueue_scripts();

		return $content;
	}
}

if ( ! function_exists( 'jet_fb_attr_for_macro_modify_frontend_config' ) ) {
	function jet_fb_attr_for_macro_modify_frontend_config( array $config ): array {
		$config[ JET_FB_ATTRIBUTES_FOR_MACROS_SLUG . '.separator' ] = ', ';

		return $config;
	}
}