<?php

class SSWSFNCT_Plugin_Links
{

    /**
     * Setup class
     */
    public function setup()
    {
        add_filter('plugin_action_links_ssws-wordpress-plugin-snippets-collection/ssws-wordpress-plugin-snippets-collection.php', array($this, 'add_links'));
    }

    /**
     * Add to links
     *
     * @param array $links
     *
     * @return array
     */
    public function add_links($links)
    {
        // array_unshift( $links, '<a href="https://www.seatoskywebsolutions.ca/" target="_blank" style="color:#00b9eb;font-weight:bold;">' . __( 'Sea to Sky Web Solutions Website', 'ssws-wordpress-plugin-snippets-collection' ) . '</a>' );

        // array_unshift( $links, '<img class="" alt="" id="" height="24" width="24" style="position: relative; top: 7px; " src="' . esc_url( plugins_url( 'assets/images/ssws-icon.svg', dirname(__FILE__) ) ) . '">');

        array_unshift($links, '<img alt="Sea to Sky Web Solutions Logo" style="position: relative; top: 7px; height: 24px; width: 24px; " src="' . esc_url(plugins_url('assets/images/ssws-icon.svg', dirname(__FILE__))) . '">');
        return $links;
    }

}
