import './polyfills';
import './utils/slideToggle';
import './utils/scroll';
import './utils/userAgent';

import libs from "./libs";

import { devices } from './utils/breakpoints';

import Menu from './components/menu';
import ScrollAnimation from './components/scroll-animation/scroll-animation';
import Header from './components/header';
import sliders from './components/sliders/index';
import Modal from './components/modal';
import validation from './components/validation';
import FormHandler from './components/form-handler';
import video from './components/video';
import { Fancybox } from '@fancyapps/ui';
import scrollUp from './components/scroll-up';

window.UPB = window.UPB || {};
window.breakpoints = devices;
window.$ = $;
window.jQuery = $;

__webpack_public_path__ = window.__webpack_public_path__ || '';

window.addEventListener('load', () => {
	document.documentElement.classList.add('is-loaded');
	new ScrollAnimation();
});

document.addEventListener('DOMContentLoaded', () => {
	document.documentElement.classList.add('content-loaded');

	libs.init();
	Menu.init();
	Header.init();
	sliders.init();
	validation.init();
	video.init();
	scrollUp.init();
	new FormHandler();
	Fancybox.bind("[data-fancybox='gallery']", {
		loop: true,
		Toolbar: { display: ["zoom", "slideShow", "thumbs", "close"] }
	});
	Modal.init();
});

window.addEventListener('reinit', () => {
	libs.init();
	Menu.init();
	Header.init();
	sliders.init();
});
