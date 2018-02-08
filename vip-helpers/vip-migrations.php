<?php

namespace Automattic\VIP\Migration;

add_action( 'vip_after_data_migration', 'Automattic\VIP\Migration\after_data_migration' );

function after_data_migration() {
	if ( is_multisite() ) {
		$sites = get_sites();

		foreach( $sites as $site ) {
			switch_to_blog( $site->blog_id );

			run_after_data_migration_cleanup();

			restore_current_blog();
		}

		return true;
	} else {
		return run_after_data_migration_cleanup();
	}
}

function run_after_data_migration_cleanup() {
	/**
	 * Fires on migration cleanup
	 *
	 * Migration cleanup runs on VIP Go during the initial site setup
	 * and after database imports. This hook can be used to add additional
	 * cleanup for a given site.
	 */
	do_action( 'vip_go_migration_cleanup' );

	delete_db_transients();

	wp_cache_flush();

	connect_jetpack();
	connect_vaultpress();

	return true;
}

function delete_db_transients() {
	global $wpdb;

	return $wpdb->query(
		"DELETE FROM $wpdb->options
		WHERE option_name LIKE '\_transient\_%'
		OR option_name LIKE '\_site\_transient\_%'"
	);
}

function connect_jetpack() {
	if ( defined( 'WP_CLI' ) && WP_CLI && class_exists( 'WP_CLI' ) ) {
		return \WP_CLI::runcommand( sprintf( 'jetpack-start connect --url=%s', home_url() ) );
	}

	return false;
}

function connect_vaultpress() {
	if ( defined( 'WP_CLI' ) && WP_CLI && class_exists( 'WP_CLI' ) ) {
		return \WP_CLI::runcommand( sprintf( 'vaultpress register_via_jetpack --url=%s', home_url() ) );
	}

	return false;
}
