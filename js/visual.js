const btnPlay = document.querySelector('.btnPlay');
const btnPause = document.querySelector('.btnPause');
const pagination = document.querySelector('.swiper-pagination');
const btnPrev = document.querySelector('.swiper-button-prev');
const btnNext = document.querySelector('.swiper-button-next');

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
	//effect: 'fade',
	autoplay: {
		delay: 2000,
	},
	slidesPerView: 3,
	spaceBetween: 30,
	breakpoints: {
		// when window width is >= 320px
		30: {
			slidesPerView: 1,
			spaceBetween: 0,
		},
		// when window width is >= 480px
		640: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// when window width is >= 640px
		1000: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	},
	centeredSlides: true,
});

btnPlay.addEventListener('click', () => {
	swiper.autoplay.start();
	btnPlay.classList.add('on');
	btnPause.classList.remove('on');
});
btnPause.addEventListener('click', () => {
	swiper.autoplay.stop();
	activateBtnPause();
});

[pagination, btnPrev, btnNext].forEach((el) => {
	el.addEventListener('click', () => {
		activateBtnPause();
	});
});

swiper.on('sliderMove', () => {
	activateBtnPause();
});

window.addEventListener('keydown', (e) => {
	if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
		activateBtnPause();
	}
});

function activateBtnPause() {
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
}
