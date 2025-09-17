import MicroModal from 'micromodal';

const Modal = {
  init() {
    this.formSetup();

    MicroModal.init({
      openTrigger: 'data-modal',
      closeTrigger: 'data-modal-close',
      openClass: 'is-open',
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
      debugMode: true,
      disableScroll: false,
      onShow: () => {
		window._disableScroll();
        window.dispatchEvent(new CustomEvent('modal.open'));
      },
      onClose: (modal) => {
		window._enableScroll();
        window.dispatchEvent(new CustomEvent('modal.close'));

        setTimeout(() => {
          const form = modal.querySelector('.form.is-sent');
          if (form) {
            form.classList.remove('is-sent');
            form.reset();

            const answer = form.querySelector('[data-form-answer]');
            if (answer) {
              answer.innerHTML = '';
            }
          }
        }, 500);
      },
    });
  },

  formSetup() {
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('form[data-ajax-form]');
      if (!form) return;
      e.preventDefault();

      setTimeout(() => {
        const answer = form.querySelector('[data-form-answer]');
        if (answer) {
          answer.innerHTML = '<span>Спасибо за обращение!</span><span>Мы свяжемся с Вами в ближайшее время!</span>';
        }
        form.classList.add('is-sent');
      }, 800);
    });
  },
};

export default Modal;