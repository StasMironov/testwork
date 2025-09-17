import { Fancybox } from "@fancyapps/ui";

export default {
	init(selector = "[data-fancybox='gallery']") {
		Fancybox.bind(selector, {
			loop: true,
			Toolbar: { display: ["zoom", "slideShow", "thumbs", "close"] }
		});
	}
};