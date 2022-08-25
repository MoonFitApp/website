(
	function( $ ) {
		'use strict';

		class CountdownTimer {
			DAY_IN_MS = 24 * 60 * 60 * 1000;
			HOUR_IN_MS = 60 * 60 * 1000;
			MIN_IN_MS = 60 * 1000;

			constructor( container, options = {} ) {
				this.container = container;
				this.options = Object.assign( {}, {
					addZeroPrefix: true,
					loop: false,
					showSeparator: true,
					separator: '<div class="countdown-separator">:</div>',
					formatter: {
						singular: {
							day: 'day',
							hour: 'hour',
							minute: 'minute',
							second: 'second',
						},
						plural: {
							day: 'days',
							hour: 'hours',
							minute: 'minutes',
							second: 'seconds',
						}
					},
					onInit: () => {
					},
					onFinished: () => {
					}
				}, options );
				this.startTime = this.options.startTime;
				this.savedStartTime = this.startTime;
				this.endTime = this.options.endTime;
				this.intervalTime = 1000;
				this.timer = null;
				this.starting = false;
				this.start();
				this.options.onInit();
			}

			// jQuery methods.
			triggerMethod = ( method, options ) => {
				if ( typeof this[ method ] === 'function' ) {
					this[ method ]( options );
				} else {
					this.start();
				}
			};

			start = () => {
				if ( ! this.starting ) {
					this.timer = setInterval( () => {
						if ( this.startTime > this.endTime ) {
							this.stop();
						} else {
							this.update();
						}
					}, this.intervalTime );

					this.starting = true;
				}
			};
			update = () => {
				this.container.html( this.format( this.endTime - this.startTime ) );

				this.startTime += this.intervalTime;
			};
			stop = () => {
				clearInterval( this.timer );
				this.starting = false;
				if ( this.options.loop ) {
					this.startTime = this.savedStartTime;
					this.start();
				} else {
					this.timer = null;
					this.options.onFinished();
				}
			};
			clear = () => {
				clearInterval( this.timer );
				this.timer = null;
				this.starting = false;
				this.startTime = this.savedStartTime;
				this.container.html( this.format( 0 ) );
			};
			addZeroPrefix = ( num ) => {
				if ( this?.options?.addZeroPrefix && num < 10 ) {
					return `0${num}`
				}
				return num.toString()
			};
			format = ( ms ) => {
				var days    = Math.floor( ms / this.DAY_IN_MS ),
				    hours   = Math.floor( ms / this.HOUR_IN_MS ) % 24,
				    minutes = Math.floor( ms / this.MIN_IN_MS ) % 60,
				    seconds = Math.floor( ms / 1000 ) % 60;

				var items = [
					this.getFormatText( days, 'day' ),
					this.getFormatText( hours, 'hour' ),
					this.getFormatText( minutes, 'minute' ),
					this.getFormatText( seconds, 'second' )
				];

				var separator = this.options.showSeparator ? this.options.separator : '';

				return '<div class="countdown-wrap">' + items.join( separator ) + '</div>';
			};
			getFormatText = ( value, type ) => {
				var period = value === 1 ? this.options.formatter.singular[ type ] : this.options.formatter.plural[ type ];
				return '<div class="countdown-item countdown-' + type + '"><div class="countdown-number">' + this.addZeroPrefix( value ) + '</div><div class="countdown-period">' + period + '</div></div>';
			}
		}

		const namespace = 'CountdownTimer';

		$.fn.extend( {
			CountdownTimer: function( args, update ) {
				// Check if selected element exist.
				if ( ! this.length ) {
					return this;
				}

				// We need to return options.
				if ( args === 'options' ) {
					return $.data( this.get( 0 ), namespace ).getOptions();
				}

				return this.each( function() {
					var $el = $( this );

					let instance = $.data( this, namespace );

					if ( instance ) { // Already created then trigger method.
						instance.triggerMethod( args, update );
					} else { // Create new instance.
						instance = new CountdownTimer( $el, args );
						$.data( this, namespace, instance );
					}
				} );
			}
		} );
	}( jQuery )
);
