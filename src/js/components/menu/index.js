import gsap from 'gsap';
import { throttle } from 'throttle-debounce';
import PerfectScrollbar from 'perfect-scrollbar';

export default {
	psSub: '',
	ps: '',
	status: 0,
	statePanel(el, status) {
		const subItems = el.querySelectorAll('[data-sub-item]');
		const tlSubItems = gsap.fromTo(
			subItems,
			{
				translateY: 20,
				opacity: 0,
			},
			{
				stagger: 0.1,
				translateY: 0,
				opacity: 1,
				ease: 'power1.out',
				paused: true,
			}
		);
		const showPanel = gsap.timeline({
			paused: true,
			duration: 0.1,
		});

		if (status) {
			showPanel.to(el, {
				xPercent: 0,
				autoAlpha: 1,
				onComplete: () => {
					tlSubItems.play();
				},
			});

			showPanel.play();
		} else {
			$(el).removeClass('is-active');
			showPanel.to(el, {
				xPercent: -100,
				autoAlpha: 0,
				onComplete: () => {
					tlSubItems.reverse().delay(0);
				},
			});

			showPanel.play();
		}
	},
	init() {
		const menuNode = document.querySelector('[data-menu]');
		if (!menuNode) return;
	
		const links = menuNode.querySelectorAll('[data-link]');
		if (!links.length > 0) return;
        
		//const triggers = menuNode.querySelectorAll('[data-trigger]');
		//console.log(triggers);
		//if (!triggers.length) return;
	//	const submenu = menuNode.querySelectorAll('[data-submenu]');
		// console.log(submenu);
		//if (!triggers.length) return;

	//	const backBtn = menuNode.querySelectorAll('[data-back]');
		//if (!backBtn.length) return;
		const burger = document.querySelector('[data-menu-burger]');
		if (!burger) return;

	//	const parentNode = document.querySelector('body');
		//if (!parentNode) return;

		const wrapNode = document.querySelector('[data-content]');
		if (!wrapNode) return;    


		function disableScrolling() {
			var x = window.scrollX;
			var y = window.scrollY;
			window.onscroll = function () {
				window.scrollTo(x, y);
			};
		}

		function enableScrolling() {
			window.onscroll = function () {};
		}

		if (window.innerWidth > 640) {
			if (!$(wrapNode).hasClass('ps')) {
				this.ps = new PerfectScrollbar(wrapNode);
			}
		}

		const timelineTrigger = gsap.fromTo(
			//triggers,
      links,
			{
				translateY: 20,
				opacity: 0,
			},
			{
				stagger: {
					each: 0.1,
				},
				translateY: 0,
				className: '+=menu__item active',
				opacity: 1,
				ease: 'power1.out',
				paused: true,
			}
		);

		burger.addEventListener(
			'click',
			throttle(100, () => {
				burger.classList.add('active');
				burger.classList.remove('not-active');
				menuNode.classList.toggle('is-active');

				if (menuNode.classList.contains('is-active')) {
					timelineTrigger.play().delay(0.3);

					disableScrolling();
				} else {
					window._enableScroll();
					burger.classList.remove('active');
					burger.classList.add('not-active');
					timelineTrigger.reverse().delay(0);
					$('body').unbind('touchmove');
					enableScrolling();
				}
			})
		);

		

		window.addEventListener('resize', () => {
			if (window.innerWidth > 640) {
				menuNode.classList.remove('is-active');
				burger.classList.remove('active');
				burger.classList.add('not-active');
				// submenu.forEach((subMenu, idx) => {
				// 	this.statePanel(subMenu, false);
				// });
				timelineTrigger.reverse().delay(0);
			}
		});
	},
};
