<?php 
namespace Automattic\VIP;

class Is_Term_Edited {
	/**
	 * @var array the default properties to compare.
	 */
	const DEFAULT_PROPERTIES = [ 
		'name',
		'slug',
		'parent',
		'term_taxonomy_id',
	];
	protected static $_self;
	/**
	 * Undocumented variable
	 *
	 * @var array
	 */
	protected $terms = [];

	protected $checked_terms = [];

	protected $keys_to_compare = [];

	public static function instance() {
		if ( ! self::$_self ) {
			self::$_self = new self();
		}
		return self::$_self;
	}

	public function __construct() {
		$this->add_hooks();
		$this->set_properties_to_compare( self::DEFAULT_PROPERTIES );
	}

	public function add_hooks() {
		add_action( 'edit_terms', [ $this, 'store_term' ], PHP_INT_MIN, 2 );
		add_action( 'edited_term', [ $this, 'deem_term_edited' ], PHP_INT_MIN, 3 );
	}

	public function remove_hooks() {
		remove_action( 'edit_terms', [ $this, 'store_term' ], PHP_INT_MIN, 2 );
		remove_action( 'edited_term', [ $this, 'deem_term_edited' ], PHP_INT_MIN, 3 );
	}

	public function store_term( $term_id, $taxonomy ) {
		$hash = $this->get_hash_for_term( get_term( $term_id, $taxonomy ), $this->keys_to_compare );
		$this->terms[ $this->get_key( $term_id, $taxonomy, $this->keys_to_compare ) ] = $hash;
		var_dump( $this->terms );
	}

	public function deem_term_edited( $term_id, $tt_id, $taxonomy ) {
		$key = $this->get_key( $term_id, $taxonomy, $this->keys_to_compare );

		$term = $this->terms[ $key ] ?? false;
		if ( $term ) {
			$fresh_term_hash = $this->get_hash_for_term( get_term( $term_id, $taxonomy ), $this->keys_to_compare );
			$is_dirty = $term !== $fresh_term_hash;

			$this->set_checked_term( $key, $is_dirty );
			// save the memory
			unset( $this->terms[ $key ] );
		}
	}

	public function is_edited( $term_id, $taxonomy ) {
		$key = $this->get_key( $term_id, $taxonomy, $this->keys_to_compare );
		return $this->checked_terms[ $key ] ?? true;
	}

	public function set_checked_term( $key, $is_dirty ) {
		$this->checked_terms[ $key ] = $is_dirty;
	}

	public function set_properties_to_compare( array $keys ) {
		$this->keys_to_compare = $keys;
	}

	public function get_key( $term_id, string $taxonomy, array $keys ): string {
		return sprintf( '%s_%s_%s', $taxonomy, $term_id, join( '_', $keys ) );
	}

	public function get_hash_for_term( $term, $keys = [] ) {
		$term = (array) $term;
		$plucked = $this->array_pluck_multiple( $term, $keys );
		return md5( json_encode( $plucked ) );
	}

	public function array_pluck_multiple( array $array, array $keys ): array {
		return array_intersect_key( $array, array_flip( $keys ) );
	}
}
