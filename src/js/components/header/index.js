import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export default {
  init() {
    const headerBottom = document.querySelector('[data-header-bottom]');
    if (!headerBottom) return;

    const header = document.querySelector('header.header');
    const progressClasses = ['in-progress', 'show-header'];

    gsap.to(headerBottom, {
      scrollTrigger: {
        trigger: headerBottom,
        start: 'top top',
        end: () => document.body.scrollHeight - window.innerHeight,
        pin: true,
        pinSpacing: false,
        onEnter: () => headerBottom.classList.add('scrolled'),
        onLeaveBack: () => headerBottom.classList.remove('scrolled'),
      },
    });

    if (header) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          if (self.direction > 0) {
            header.classList.add(...progressClasses);
          } else {
            if (self.progress !== 0) {
              header.classList.add(...progressClasses);
            } else {
              header.classList.remove(...progressClasses);
            }
          }
        },
      });
    }
  },
};