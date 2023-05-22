(
	function () {
		const {
			      addFilter,
			      addAction,
		      } = JetPlugins.hooks;

		const {
			      BaseHtmlAttr = () => {},
			      CalculatedFormula,
		      } = JetFormBuilderAbstract;

		const {
			      isEmpty,
		      } = JetFormBuilderFunctions;

		const separator = JetFormBuilderSettings[ 'jfb-attributes-for-macros.separator' ];

		function OptionsLabelAttr() {
			BaseHtmlAttr.call( this );

			this.attrName = 'optionLabel';

			this.isSupported = function ( input ) {
				const classList = input.getWrapperNode()?.classList ?? {};

				return (
					classList?.contains?.( 'field-type-checkbox-field' ) ||
					classList?.contains?.( 'field-type-radio-field' ) ||
					classList?.contains?.( 'field-type-select-field' )
				);
			};

			this.updateAttr = function () {
				let { current } = this.input.value;

				if ( isEmpty( current ) ) {
					this.value.current = '';

					return;
				}

				const callback = this.getUpdateAttrCallback();

				this.value.current = callback.call( this );
			};

			this.getUpdateAttrCallback = function () {
				switch ( this.inputType ) {
					case 'checkbox':
						return this.getLabelFormCheckbox;
					case 'select-multiple':
						return this.getLabelFormSelectMultiple;
					case 'select-one':
						return this.getSelectLabel;
					case 'radio':
						return this.getRadioLabel;
				}
			};

			this.getLabelFormCheckbox = function () {
				const labels      = [];
				const { current } = this.input.value;

				for ( const node of this.input.nodes ) {
					if ( !current.includes( node.value ) ) {
						continue;
					}
					const label = node.closest(
						'.jet-form-builder__field-label',
					);
					labels.push( label.querySelector( 'span' ).innerHTML );
				}

				return labels.join( this.separator );
			};

			this.getLabelFormSelectMultiple = function () {
				const labels      = [];
				const { current } = this.input.value;
				const [ node ]    = this.input.nodes;

				for ( const currentValue of current ) {
					labels.push(
						node.querySelector( `[value="${ currentValue }"]` ).innerHTML,
					);
				}

				return labels.join( this.separator );
			};

			this.getRadioLabel = function () {
				const { current } = this.input.value;

				for ( const node of this.input.nodes ) {
					if ( current !== node.value ) {
						continue;
					}
					const label = node.closest(
						'.jet-form-builder__field-label',
					);

					return label.querySelector( 'span' ).innerHTML;
				}
			};

			this.getSelectLabel = function () {
				const { current } = this.input.value;
				const [ node ]    = this.input.nodes;

				return node.querySelector( `[value="${ current }"]` ).innerHTML;
			};

			this.addWatcherAttr = function () {
				this.input.value.watch( () => this.updateAttr() );
			};

			this.setInput = function ( input ) {
				BaseHtmlAttr.prototype.setInput.call( this, input );

				const [ node ] = input.nodes;

				this.inputType = node.type;
				this.separator = separator;
			};
		}

		OptionsLabelAttr.prototype = Object.create( BaseHtmlAttr.prototype );

		function RawCalculateAttr() {
			BaseHtmlAttr.call( this );

			this.attrName = 'rawCalc';

			this.isSupported = function ( input ) {
				const classList = input.getWrapperNode()?.classList ?? {};

				return (
					classList?.contains?.( 'field-type-checkbox-field' ) ||
					classList?.contains?.( 'field-type-radio-field' ) ||
					classList?.contains?.( 'field-type-select-field' )
				);
			};

			this.updateAttr = function () {
				let { current } = this.input.value;

				if ( isEmpty( current ) ) {
					this.value.current = this.input.isArray() ? [] : '';

					return;
				}

				const callback = this.getUpdateAttrCallback();

				this.value.current = callback.call( this );
			};

			this.getUpdateAttrCallback = function () {
				switch ( this.inputType ) {
					case 'checkbox':
						return this.getLabelFormCheckbox;
					case 'select-multiple':
						return this.getLabelFormSelectMultiple;
					case 'select-one':
						return this.getSelectLabel;
					case 'radio':
						return this.getRadioLabel;
				}
			};

			this.getLabelFormCheckbox = function () {
				const values      = [];
				const { current } = this.input.value;

				for ( const node of this.input.nodes ) {
					if ( !current.includes( node.value ) ) {
						continue;
					}
					values.push( node.dataset?.calculate ?? node.value );
				}

				return values;
			};

			this.getLabelFormSelectMultiple = function () {
				const values      = [];
				const { current } = this.input.value;
				const [ node ]    = this.input.nodes;

				for ( const currentValue of current ) {
					const option = node.querySelector(
						`[value="${ currentValue }"]`,
					);
					values.push( option.dataset?.calculate ?? option.value );
				}

				return values;
			};

			this.getRadioLabel = function () {
				const { current } = this.input.value;

				for ( const node of this.input.nodes ) {
					if ( current !== node.value ) {
						continue;
					}

					return (
						node.dataset?.calculate ?? node.value
					);
				}
			};

			this.getSelectLabel = function () {
				const { current } = this.input.value;
				const [ node ]    = this.input.nodes;

				const checked = node.querySelector( `[value="${ current }"]` );

				return (
					checked.dataset?.calculate ?? checked.value
				);
			};

			this.addWatcherAttr = function () {
				this.input.value.watch( () => this.updateAttr() );
			};

			this.setInput = function ( input ) {
				BaseHtmlAttr.prototype.setInput.call( this, input );

				const [ node ] = input.nodes;

				this.inputType = node.type;
				this.separator = separator;
			};
		}

		RawCalculateAttr.prototype = Object.create( BaseHtmlAttr.prototype );

		addFilter(
			'jet.fb.input.html.attrs',
			'jfb-attributes-for-macros/add-label-separator',
			function ( types ) {
				types.push(
					OptionsLabelAttr,
					RawCalculateAttr,
				);

				return types;
			},
		);

		/**
		 * @param result
		 * @param fieldName {String}
		 * @param params {Array}
		 * @param formula {CalculatedFormula}
		 */
		function getExternalMacro( result, fieldName, params, formula ) {
			const parts = fieldName.match( /^(\d+)::(.+)/ );

			if ( !Array.isArray( parts ) || !Number.isInteger( +parts[ 1 ] ) ) {
				return result;
			}
			const formId = +parts[ 1 ];
			const macro  = parts[ 2 ];

			const innerFormula     = new CalculatedFormula();
			innerFormula.setResult = () => formula.setResult();

			if ( JetFormBuilder.hasOwnProperty( formId ) ) {
				innerFormula.root = JetFormBuilder[ formId ];

				return innerFormula.observeMacro( macro );
			}

			addAction(
				'jet.fb.observe.after',
				'jfb-attributes-for-macros/add-external-namespace-by-form-id',
				/**
				 * @param observable {Observable}
				 */
				function ( observable ) {
					if ( observable.parent ||
						observable.getSubmit().getFormId() !== formId
					) {
						return;
					}
					innerFormula.root = JetFormBuilder[ formId ];
					formula.setResult();
				},
			);

			let hasObserved = false;
			let response;

			return () => {
				if ( !innerFormula.root ) {
					return 0;
				}
				if ( !hasObserved ) {
					hasObserved = true;
					response    = innerFormula.observeMacro( macro );
				}

				return 'function' === typeof response ? response() : response;
			};
		}

		addFilter(
			'jet.fb.custom.formula.macro',
			'jfb-attributes-for-macros/add-external-namespace-by-form-id',
			getExternalMacro,
		);

		const onPageLoad = function () {
			const {
				      iterateComments,
				      observeComment,
			      } = JetFormBuilderFunctions;

			const {
				      addAction,
			      } = JetPlugins.hooks;

			const regexp = /JFB_FIELD::(\d+)/;

			function* iterateExtraComments( rootNode ) {
				const acceptCallback = node => {
					return (
						!node.jfbObserved && regexp.test( node.textContent )
					);
				};

				yield* iterateComments( rootNode, acceptCallback );
			}

			for (
				const comment of iterateExtraComments( document.body )
				) {
				let [ , formId ] = comment.textContent.match( regexp );

				// to int
				formId = +formId;

				if ( JetFormBuilder.hasOwnProperty( formId ) ) {
					observeComment( comment, JetFormBuilder[ formId ] );
				}
				else {
					addAction(
						'jet.fb.observe.after',
						'jfb-attributes-for-macros/add-external-namespace-by-form-id',
						/**
						 * @param observable {Observable}
						 */
						function ( observable ) {
							if ( observable.parent ||
								observable.getSubmit().getFormId() !== formId ||
								comment.jfbObserved
							) {
								return;
							}
							observeComment( comment, JetFormBuilder[ formId ] );
						},
					);
				}
			}
		};

		if ( document.readyState !== 'loading' ) {
			onPageLoad();
		}
		else {
			document.addEventListener( 'DOMContentLoaded', onPageLoad );
		}
	}
)();