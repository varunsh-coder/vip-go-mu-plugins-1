<?php

namespace Automattic\VIP;

use PHPUnit\Framework\TestCase;
use Yoast\PHPUnitPolyfills\Polyfills\ExpectPHPException;

require_once __DIR__ . '/../../../lib/is-term-edited/class-is-term-edited.php';

// phpcs:disable WordPress.PHP.DiscouragedPHPFunctions.runtime_configuration_error_reporting

/**
 * @runTestsInSeparateProcesses
 * @preserveGlobalState disabled
 */
class Is_Term_Edited_Test extends TestCase {
	use ExpectPHPException;

	private $error_reporting;

	protected function setUp(): void {
		$this->error_reporting = error_reporting();
	}

	protected function tearDown(): void {
		error_reporting( $this->error_reporting );
		parent::tearDown();
	}

	public function test_simple() {
		// Init
		$is_term_edited_instance = \Automattic\VIP\Is_Term_Edited::instance();

		$factory = new \WP_UnitTest_Factory_For_Term( null, 'category' );
		$term_id = $factory->create_object( [
			'name' => 'my-cool-term',
			'slug' => 'my-cool-term',

		] );
		add_action( 'edited_term', function( $term_id, $tt_id, $taxonomy ) use ( $is_term_edited_instance ) {
			$this->assertTrue( $is_term_edited_instance->is_edited( $term_id, $taxonomy ), 'term is updated' );
		}, 10, 3 );

		wp_update_term( $term_id, 'category', [ 'name' => 'updated' ] );
	}

	public function test_not_updated() {
		// Init
		$is_term_edited_instance = \Automattic\VIP\Is_Term_Edited::instance();

		$factory = new \WP_UnitTest_Factory_For_Term( null, 'category' );
		$term_id = $factory->create_object( [
			'name' => 'my-cool-term-too',
			'slug' => 'my-cool-term-too',
		] );

		add_action( 'edited_term', function( $term_id, $tt_id, $taxonomy ) use ( $is_term_edited_instance ) {
			$this->assertFalse( $is_term_edited_instance->is_edited( $term_id, $taxonomy ), 'term is identical' );
		}, 10, 3 );

		wp_update_term( $term_id, 'category', [ 'name' => 'my-cool-term-too' ] );
	}
}
