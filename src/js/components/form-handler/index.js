import axios from 'axios';

export default class FormHandler {
	constructor() {
		this.form = null;
		this.url = null;
		this.formData = null;

		this.init();
	}

	init() {
		window.addEventListener('form:submit', (e) => this.handler(e));
		window.addEventListener('form:result', (e) => this.showResult(e));
	}

	handler(e) {
		this.form = e.detail.target;
		if (!this.form) return;

		if (this.form.hasAttribute('data-basket')) {
			window.dispatchEvent(new CustomEvent('basket-from:sent'));
		}

		this.url = this.form.getAttribute('action');
		this.formData = new FormData(this.form);

		if (!this.url) return;

		// Loader
		this.showLoader();

		axios
			.post(this.url, this.formData)
			.then((res) => {
				this.hideLoader();
				window.dispatchEvent(
					new CustomEvent('form:result', { detail: res.data }),
				);
			})
			.catch((error) => {
				console.error(error);
				this.hideLoader();

				const data = {
					status: 'error',
					title: 'Ошибка',
					message: 'Попробуйте позже',
				};

				// Show result modal
				window.dispatchEvent(
					new CustomEvent('form:result', { detail: data }),
				);
			});
	}

	showResult(e) {
		const { data } = e.detail;

		this.clearForm();

		const answerContainer = this.form.querySelector('[data-form-answer]');
		if (!answerContainer) return;

		if (data.title) {
			const title = document.createElement('p');
			title.classList.add('h3');
			title.classList.add('form-answer-title');
			title.innerHTML = data.title;

			answerContainer.appendChild(title);
		}

		if (data.message) {
			const message = document.createElement('p');
			message.classList.add('text-body');
			message.classList.add('form-answer-message');
			message.innerText = data.message;

			answerContainer.appendChild(message);
		}

		if (data.caption) {
			const caption = document.createElement('p');
			caption.classList.add('text-body');
			caption.classList.add('form-answer-caption');
			caption.innerText = data.caption;

			answerContainer.appendChild(caption);
		}

		this.form.classList.add('is-sent');

		window.dispatchEvent(new CustomEvent('form:sent'));

		const isElementInViewport = (el) => {
			// Special bonus for those using jQuery
			if (typeof jQuery === 'function' && el instanceof jQuery) {
				el = el[0];
			}

			const rect = el.getBoundingClientRect();

			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
				rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
			);
		};

		if (!isElementInViewport(answerContainer)) {
			answerContainer.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}

	showLoader() {
		const submitBtn = this.form.querySelector('button[type=submit]');

		submitBtn.classList.add('is-loading');
	}

	hideLoader() {
		const submitBtn = this.form.querySelector('button[type=submit]');

		submitBtn.classList.remove('is-loading');
	}

	clearForm() {
		const fields = this.form.querySelectorAll('input, textarea, select');

		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];

			if (
				field.getAttribute('type') === 'hidden' ||
				field.getAttribute('type') === 'checkbox'
			)
				continue;

			field.value = '';
			if (field.hasAttribute('data-select')) {
				const $field = $(field);
				$field.val('').trigger('change');
			}

			field.classList.remove('not-empty filled');
			field.classList.remove('parsley-success');
		}
	}
}
