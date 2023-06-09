const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn_search');
const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');

const api_key = '86fbba2c96b5252a51879bc23af1f41e';
const num = 50;
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

const method_interest = 'flickr.interestingness.getList';
const url_interest = `${baseURL}${method_interest}`;

const myId = '194260994@N06';
const method_user = 'flickr.people.getPhotos';
const url_user = `${baseURL}${method_user}&user_id=${myId}`;

const method_search = 'flickr.photos.search';
// const url_search = `${baseURL}${method_search}&tags=landscape`;

fecthData(url_interest);

btnSearch.addEventListener('click', (e) => {
	e.preventDefault();
	const value = input.value.trim();
	input.value = '';

	if (value === '') return alert('검색어를 입력해주세요!');

	const url_search = `${baseURL}${method_search}&tags=${value}`;
	fecthData(url_search);
});

btnInterest.addEventListener('click', (e) => {
	e.preventDefault();

	fecthData(url_interest);
});

btnMine.addEventListener('click', (e) => {
	e.preventDefault();

	fecthData(url_user);
});

async function fecthData(url) {
	loading.classList.remove('off');
	wrap.classList.remove('on');

	const res = await fetch(url);
	const json = await res.json();
	const items = json.photos.photo;
	console.log(items);

	createList(items);
}

function createList(arr) {
	let tags = '';

	arr.forEach((item) => {
		tags += `
        <li class='item'>
          <div>
            <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
              <img class='thumb' src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
            </a>
            <p>${item.title === '' ? 'Have a good day!!' : item.title}</p>

						<article class='profile'>	
							<img src='http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg' />				
							<span>${item.owner}</span>
						</article>
          </div>
        </li>
      `;
	});
	wrap.innerHTML = tags;

	setLoading();
	// const id_view = document.querySelectorAll('.profile span');

	// const id_choice = id_view.textContent();
	// id_view.addEventListener('click', (e) => {

	// 	const url_id = `${baseURL}${method_user}&user_id=${id_choice}`;
	// 	fecthData(url_id);
	// });
	// idView(id_view);
}

// function idView(el) {}

function setLoading() {
	const imgs = wrap.querySelectorAll('img');
	let count = 0;

	for (const el of imgs) {
		//만약 이미지에 엑박이 뜨면 onerror이벤트로 잡아서 디폴트 이미지로 대체
		el.onerror = () => {
			el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
		};
		//디폴트로 변경된 이미지까지 포함해서 카운트 (무한로딩에 빠지지 않음)
		el.onload = () => {
			count++;
			count === imgs.length && isoLayout();
		};
	}
}

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}
