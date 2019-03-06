<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function hebo_logo_slider_cgb_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'hebo-logo_slider-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register slick styles for logo slider
	wp_enqueue_style(
		'slick-style',
		plugins_url('dist/vendor/slick.css', dirname( __FILE__ ) ),
		null
	);

	// Register slick styles for logo slider
	wp_enqueue_style(
		'slick-style-theme',
		plugins_url('dist/vendor/slick-theme.css', dirname( __FILE__ ) ),
		null
	);

	// Register script for logo slider
	wp_enqueue_script(
		'slick-script',
		plugins_url('dist/vendor/slick.js', dirname( __FILE__ ) ),
		array( 'jquery' ), // Dependencies, defined above
		null
	);

	wp_enqueue_script(
		'hebo-logo_slider-custom-js',
		plugins_url('dist/custom.js', dirname( __FILE__ ) ),
		array( 'jquery', 'slick-script' ), // Dependencies, defined above
		'1.0.0',
		true // Enqueue the script in the footer
	);
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'hebo_logo_slider_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function hebo_logo_slider_cgb_editor_assets() { // phpcs:ignore
	// Scripts.
	wp_enqueue_script(
		'hebo-logo_slider-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		//true // Enqueue the script in the footer.
	);

	// Styles.
	wp_enqueue_style(
		'hebo-logo_slider-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'hebo_logo_slider_cgb_editor_assets' );
