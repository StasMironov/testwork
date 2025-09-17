import Slider from "./constructor";

export default {
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-slider-image]',
			slider: '[data-slider]',
			prev: '[data-nav-arrow-prev]',
			next: '[data-nav-arrow-next]',
			paginationSelector: '[data-slider-pagination]',
			options: {
				slidesPerView: 1,
				loop: false,
				speed: 800,
				fadeEffect: { crossFade: true },
				effect: 'fade',
				a11y: false,
				observer: true,
				observeParents: true,
				breakpoints: {
					[window.breakpoints.lg]: {
						slidesPerView: 1
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
			},
		});
	}
};
