const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');

const swiper = new Swiper('#visual', {
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		dynamicBullets: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	keyboard: true,
	loop: true,
	effect: 'fade',
	autoplay: {
		delay: 2000,
	},
});

btnPlay.addEventListener('click', () => {
	swiper.autoplay.start();
});
btnPause.addEventListener('click', () => {
	swiper.autoplay.stop();
	console.log('stop');
});
