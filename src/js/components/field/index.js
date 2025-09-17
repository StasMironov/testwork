import inViewport from '../../utils/inViewport';

const field = {
	init() {
		const fields = document.querySelectorAll('.field');

		// eslint-disable-next-line no-shadow
		fields.forEach((field) => {
			const input = field.querySelector('.js-field, .search');
			const select = field.querySelector('select');
			const datepicker = field.querySelector('.datepicker');

			if (!field.classList.contains('is-init')) {
				if (input) {
					const form = input.closest('form');
					if (input.value) {
						field.classList.add('field--active');
					} else {
						field.classList.remove('field--active');
					}
					input.addEventListener('input', (e) => {
						if (e.target.value) {
							field.classList.add('field--active');
						} else {
							field.classList.remove('field--active');
						}
					});

					if (form) {
						form.addEventListener('reset', () => {
							const fieldsForm = form.querySelectorAll('.field');
							fieldsForm.forEach((fieldForm) => {
								if (fieldForm.querySelector('.ss-deselect')) {
									fieldForm
										.querySelector('.ss-deselect')
										.click();
								}
								fieldForm.classList.remove('field--active');
							});
						});
					}

					input.addEventListener('keypress', (e) => {
						if (!inViewport(field)) {
							field.scrollIntoView({
								block: 'center',
							});
						}
					});

					if (input.type === 'file') {
						const filesList = document.createElement('div');
						filesList.classList.add('field__files-list');
						field.prepend(filesList);

						input.addEventListener('change', (e) => {
							if (e.target.files.length) {
								filesList.innerHTML = '';
								filesList.classList.add('is-show');

								const filesNode = document.createElement('div');
								filesNode.classList.add('field__files-item');
								const { fileName, ext } = this.getFileExt(e);
								filesNode.textContent = `${fileName.length < 17 ? fileName : `${fileName.substr(0, 17)}..`}.${ext}`;

								filesList.appendChild(filesNode);

								filesNode.addEventListener('click', (e) => {
									input.value = '';
									filesNode.remove();
									filesList.classList.remove('is-show');
								});
							}
						});
					}
				}

				if (select) {
					const options = select.querySelectorAll('option');

					options.forEach((option) => {
						if (
							option.selected &&
							!option.hasAttribute('data-placeholder')
						) {
							field.classList.add('field--active');
						}
					});

					select.addEventListener('change', () => {
						field.classList.add('field--active');
					});
				}

				if (datepicker) {
					if (datepicker.value) {
						field.classList.add('field--active');
					} else {
						field.classList.remove('field--active');
					}
				}
			}
			field.classList.add('is-init');
		});
	},

	getFileExt(event) {
		if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
			return;
		}

		const { name } = event.target.files[0];
		const lastDot = name.lastIndexOf('.');

		const fileName = name.substring(0, lastDot);
		const ext = name.substring(lastDot + 1);

		return {
			fileName,
			ext,
		};
	}
};

// eslint-disable-next-line import/prefer-default-export
export { field };
