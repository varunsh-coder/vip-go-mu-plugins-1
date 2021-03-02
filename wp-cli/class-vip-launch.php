<?php

namespace Automattic\VIP\CLI;

/**
 * Helper command for launches
 *
 * @package Automattic\VIP\Files
 */
class VIP_Launch extends WPCOM_VIP_CLI_Command {
	public function prepare( $args, $assoc_args ) {

		$_url = WP_CLI::get_config( 'url', false );
		$_launched_site_url = WP_CLI\Utils\get_flag_value( $assoc_args, 'launched-site-url', false );
		if ( empty( $_url ) || false === $_launched_site_url ) {
			WP_CLI::error( __( 'You must specify a --url and a --launched-site-url:' ) );
		}


		WP_CLI::line( __( 'You are about to:' ) );
		WP_CLI::line( __( '1) change the home and site_url for subsite 5 from example.com to newexample.com.' ) );
		/* translators: 1: Site Url, 2: New Site URL */
		WP_CLI::line( sprintf( __( '2) Perform a search and replace on all instances of %1$s, replacing them with %2$s (quit and re-run with --skip-search-replace to bypass this)' ), $_url, $_launched_site_url ) );
		WP_CLI::line( __( '3) Flush the object cache.' ) );
		WP_CLI::confirm( __( 'Are you sure you wish to proceed?' ) );

		if ( is_multisite() ) {
			$update_site_error = wp_update_site( get_current_blog_id(), [ 'domain' => $_launched_site_url ] );
			if ( is_wp_error( $update_site_error ) ) {
				WP_CLI::error( $update_site_error->get_error_message() );
				return;
			}
		}

		update_option( 'siteurl', $_launched_site_url );
		update_option( 'home', $_launched_site_url );

		WP_CLI::run_command([ 'search-replace', $_url, $_launched_site_url ], [
			'all-tables-with-prefix' => true,
			'report-changed-only' => true,
		] ); // Will be run with the same global parameters as parent comman (i.e. --url )
		WP_CLI::line( __( 'Flushing the cache' ) );
		wp_cache_flush();

	}
}

WP_CLI::add_command( 'vip launch', 'VIP_Launch' );
