<?php
/**
 * Plugin Name: SSWS WordPress Plugin Snippets Collection
 * Plugin URI: https://www.seatoskywebsolutions.ca/
 * Description: WordPress plugin that collects useful snippets to enanche hidden/secret WP functionalty
 * Version: 1.0.0
 * Author: Giorgio Riccardi @SSWS
 * Author URI: https://www.seatoskywebsolutions.ca/
 * Requires at least: 3.0.0
 * Tested up to: 5.2.2
 * Requires PHP: 7.x

 * @package SSWS_WP_Snippets_Collection

 * License: GPL v3

 * SSWS Functions Plugin
 * Copyright © 2017-2019, SSWS - www.ssws.ca

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Safety first!

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class SSWSFunctions
{

    const OPTION_INSTALL_DATE = 'ssws-functions-install-date';
    const OPTION_ADMIN_NOTICE_KEY = 'ssws-functions-hide-notice';

    /**
     * Method run on plugin activation
     */
    public static function plugin_activation()
    {
        // for admin bar banner
        // include nag class
        require_once plugin_dir_path(__FILE__) . '/classes/class-nag.php';

        // insert install date
        SSWSFNCT_Nag::insert_install_date();
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        // admin bar banner
        add_action('init', array($this, 'frontend_hooks'));
        add_action('admin_init', array($this, 'admin_hooks'));

        // custom functions and styles
        add_action('init', array($this, 'theme_customization_setup'), -1);
        require_once 'custom-code/functions.php';
    }

    // start custom functions and styles code

    /**
     * Setup all the things
     */
    public function theme_customization_setup()
    {
        // load custom css at the very end
        add_action('wp_enqueue_scripts', array($this, 'theme_customization_css'), 9999);
        add_action('wp_enqueue_scripts', array($this, 'theme_customization_js'));
        add_filter('template_include', array($this, 'theme_customization_template'), 11);
        add_filter('wc_get_template', array($this, 'theme_customization_wc_get_template'), 11, 5);
    }

    /**
     * Enqueue the CSS
     *
     * @return void
     */
    public function theme_customization_css()
    {
        wp_enqueue_style('ssws-custom-css', plugins_url('/custom-code/style.css', __FILE__));
    }

    /**
     * Enqueue the Javascript
     *
     * @return void
     */
    public function theme_customization_js()
    {
        wp_enqueue_script('ssws-custom-js', plugins_url('/custom-code/scripts/main.js', __FILE__), array('jquery'));
    }

    // end custom functions and styles code

    // start admin bar banner code

    /**
     * Setup the admin hooks
     *
     * @return void
     */
    public function admin_hooks()
    {

        // Check if user is an administrator
        if (!current_user_can('manage_options')) {
            return false;
        }

        // include plugin links class
        require_once plugin_dir_path(__FILE__) . '/classes/class-plugin-links.php';

        // setup plugin links
        $plugin_links = new SSWSFNCT_Plugin_Links();
        $plugin_links->setup();
    }

    /**
     * Setup the frontend hooks
     *
     * @return void
     */
    public function frontend_hooks()
    {
        // Don't run in admin or if the admin bar isn't showing
        if (is_admin() || !is_admin_bar_showing()) {
            return;
        }

        // SSWSFNCT actions and filters
        add_action('wp_head', array($this, 'print_css'));
        add_action('admin_bar_menu', array($this, 'admin_bar_menu'), 1000);

    }

    /**
     * Add the admin bar menu
     */
    public function admin_bar_menu()
    {
        global $wp_admin_bar;

        // Add top menu
        $wp_admin_bar->add_menu(array(
            'id' => 'sswsfnct-bar',
            'parent' => 'top-secondary',
            'title' => __('SSWS', 'ssws-functions'),
            'href' => false,
        ));

        // Add powered by
        $wp_admin_bar->add_menu(array(
            'id' => 'sswsfnct-bar-powered-by',
            'parent' => 'sswsfnct-bar',
            'title' => 'Powered by SSWS WP Development',
            'class' => '',
            'href' => 'https://www.seatoskywebsolutions.ca/',
            'target' => '_blank',
        ));

    }

    /**
     * Print the custom CSS
     */
    public function print_css()
    {
        echo "<style type=\"text/css\" media=\"screen\"> #wp-admin-bar-sswsfnct-bar > .ab-item { padding-right: 26px !important; background: url('" . plugins_url('assets/images/camp-pacific-icon.svg', __FILE__) . "') center right no-repeat !important; background-size: contain !important; } #wp-admin-bar-sswsfnct-bar.hover > .ab-item { background-color: #32373c !important; } #wp-admin-bar-sswsfnct-bar #wp-admin-bar-sswsfnct-bar-template-file .ab-item, #wp-admin-bar-sswsfnct-bar #wp-admin-bar-sswsfnct-bar-template-parts { text-align: right; } #wp-admin-bar-sswsfnct-bar-template-parts.menupop > .ab-item: before { right: auto !important; } #wp-admin-bar-sswsfnct-bar-powered-by { text-align: right; } #wp-admin-bar-sswsfnct-bar-powered-by a { color:#c6ff00 !important; } </style>\n";
    }

    // end admin bar banner code

} // end Class SSWSFunctions

/**
 * SSWS Functions main function
 */
function __ssws_functions_main()
{
    new SSWSFunctions();
}

// Init plugin
add_action('plugins_loaded', '__ssws_functions_main');

// Register hook
register_activation_hook(__FILE__, array('SSWSFunctions', 'plugin_activation'));
