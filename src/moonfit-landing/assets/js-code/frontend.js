(
	function( $ ) {
		'use strict';

		var Helpers = moonfit.Helpers,
		    $window = $( window ),
		    $header = $( '#header' );

		$window.on( 'scroll', function() {
			var currentST = $( this ).scrollTop();

			if ( currentST > 0 ) {
				$header.addClass( 'header-pinned' );
			} else {
				$header.removeClass( 'header-pinned' );
			}
		} );

		$( document ).ready( function() {
			scrollTo();
			//initVideoPopups();
			initSliders();
			handleNftStageDate();
		} );

		$( window ).on( 'load', function() {
			initSectionEffectSnow();
		} );

		if ( typeof AOS !== 'undefined' ) {
			AOS.init( {
				duration: 1000,
				delay: 200,
				once: true,
			} );
		}

		function scrollTo() {
			$( document.body ).on( 'click', '.scroll-to', function( evt ) {
				const href = $( this ).attr( 'href' );
				const $target = $( href );

				if ( $target.length > 0 ) {
					evt.preventDefault();

					const offsetTop = $target.offset().top;

					window.scroll( {
						top: offsetTop - 30,
						left: 0,
						behavior: 'smooth'
					} );
				}
			} )
		}

		function initVideoPopups() {
			if ( $.fn.lightGallery ) {
				var options = {
					selector: '.video-link',
					fullScreen: false,
					zoom: false,
					getCaptionFromTitleOrAlt: false,
					counter: false
				};

				$( '.video-popup' ).each( function() {
					$( this ).lightGallery( options );
				} );
			}
		}

		function initSliders() {
			$( '.tm-swiper' ).each( function() {
				$( this ).MoonfitSwiper();
			} );
		}

		function initSectionEffectSnow() {
			if ( ! $.firefly ) {
				return;
			}

			$( '.section-effect-snow' ).each( function() {
				var $thisSection = $( this );

				var total = $thisSection.data( 'firefly-total' ) ? $thisSection.data( 'firefly-total' ) : 50;

				var minPixel = Helpers.isHandheld() ? 2 : 3;
				var maxPixel = Helpers.isHandheld() ? 3 : 4;

				var settings = {
					//color: 'rgba(255,255,255,0.3)',
					color: '#808390',
					minPixel: minPixel,
					maxPixel: maxPixel,
					total: total,
					on: $thisSection,
					zIndex: 0,
				};

				$.firefly( settings );
			} );
		}

		function handleNftStageDate() {
			var DAY_IN_SECONDS = 1000 * 60 * 60 * 24;

			$( '.block-nft-stage' ).each( function() {
				var date = $( this ).data( 'time' );
				if ( typeof  date !== 'undefined' ) {
					var openDate = new Date( date );
					var today = new Date();

					var daysLeft = Math.ceil( (
						                          openDate.getTime() - today.getTime()
					                          ) / DAY_IN_SECONDS );

					daysLeft = daysLeft > 0 ? daysLeft : 0;
					var output = '<span class="day-left">' + daysLeft + '</span>';
					output += daysLeft === 1 ? ' day left' : ' days left';

					$( this ).find( '.badge-inner' ).html( output );
					$( this ).find( '.badge-day-left' ).addClass( 'rendered' );
				}
			} );
		}
	}( jQuery )
);
