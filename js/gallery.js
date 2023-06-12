const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const input = document.querySelector('.gallery #search');
const btnSearch = document.querySelector('.gallery .btn_search');
const btnInterest = document.querySelector('.gallery .btnInterest');
const btnMine = document.querySelector('.gallery .btnMine');

const api_key = '86fbba2c96b5252a51879bc23af1f41e';
const num = 50;
const myId = '194260994@N06';

fecthData(setURL('interest'));

btnSearch.addEventListener('click', (e) => {
	e.preventDefault();
	const value = input.value.trim();
	input.value = '';

	if (value === '') return alert('검색어를 입력해주세요!');

	fecthData(setURL('search'));
});

//사용자 아이디 클릭시 해당 갤러리 이벤트
wrap.addEventListener('click', (e) => {
	if (e.target.className === 'userid') {
		fecthData(setURL('user', e.target.innerText));
	}
});

btnInterest.addEventListener('click', () => fecthData(setURL('interest')));
btnMine.addEventListener('click', () => fecthData(setURL('user', myId)));

//인수값에 따는 데이터 호출 URL 반환함수
function setURL(type, opt) {
	const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	if (type === 'interest') return `${baseURL}${method_interest}`;
	if (type === 'search') return `${baseURL}${method_search}&tags=${opt}`;
	if (type === 'user') return `${baseURL}${method_user}&user_id=${opt}`;
}

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
							<span class="userid">${item.owner}</span>
						</article>
          </div>
        </li>
      `;
	});
	wrap.innerHTML = tags;

	setLoading();
}

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
