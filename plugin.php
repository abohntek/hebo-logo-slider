<?php
/**
 * Plugin Name: HeBo Logo Slider Block
 * Plugin URI: https://github.com/abohntek/teaser-block/
 * Text Domain: teaser-block
 * Description: HeBo Logo Slider Block is a Gutenberg plugin created via create-guten-block. See: https://github.com/ahmadawais/create-guten-block
 * Author: Alexander Bohn
 * Author URI: https://www.hebotek.at
 * Version: 1.0.0
 * License: GPLv3+
 * License URI: http://www.gnu.org/copyleft/gpl.html
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
