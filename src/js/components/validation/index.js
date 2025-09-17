import 'parsleyjs';
import './parsley-ru';

export default {
	init() {
		window.addEventListener('init.validation', () => {
			const $lang = $('html').attr('lang');
			const $forms = $(
				'[data-parsley-validate]:not([data-parsley-initialized])'
			);

			$forms.each((index, form) => {
				const $form = $(form);
				$form.parsley({
					errorClass: 'parsley-error',
					successClass: 'parsley-success',
				});

				$form.on('submit', (e) => {
					if (form.hasAttribute('data-ajax-form')) {
						e.preventDefault();

						window.dispatchEvent(
							new CustomEvent('form:submit', { detail: e })
						);
					}
				});

				window.Parsley.on('field:error', function () {
					//console.log($(this.$element).parent());
					$(this.$element).parent().addClass('error');
			  		// this.$element.attr('name'));
				});

				window.Parsley.on('field:success', function () {
					$(this.$element).parent().removeClass('error');
				});

				$form.attr('data-parsley-initialized', '');
				window.Parsley.setLocale(`${$lang}`);
			});
		});
		window.dispatchEvent(new CustomEvent('init.validation'));
	},
};
