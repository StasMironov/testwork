import Slider from "./constructor";

export default {
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-slider-resources]',
			slider: '[data-slider]',
			prev: '[data-nav-arrow-prev]',
			next: '[data-nav-arrow-next]',
            paginationSelector: '[data-slider-pagination]',
			iOSEdgeSwipeDetection: true,
			options: {
				slidesPerView: 1,
				loop: false,
				speed: 800,
				a11y: false,
				observer: true,
				observeParents: true,
				spaceBetween: 8,
				lazy: {
					loadPrevNext: true,
					elementClass: 'swiper-lazy',
				},
				breakpoints: {
					[window.breakpoints.lg]: {
						slidesPerView: 4,
                        spaceBetween: 30
					},
					[window.breakpoints.md]: {
						slidesPerView: 2,
                        spaceBetween: 16
					}
				},
                navigation: {
					nextEl: '[data-nav-arrow-next]',
					prevEl: '[data-nav-arrow-prev]'
				  },
				  pagination: {
					el: '[data-slider-pagination]',
					clickable: true
				  }
			}
		});
	}
};
