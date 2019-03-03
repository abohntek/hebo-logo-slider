jQuery(".slider").slick({
	autoplay: true,
	autoplaySpeed: 1500,
	dots: true,
	variableWidth: true,
	arrows: false,
	speed: 1100,
	infinite: true,
	centerMode: true,
	slidesToShow: 1,
	slidesToScroll: 1,
    responsive: [{
        breakpoint: 500,
        settings: {
            dots: false,
        }
    }]
});
