const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const api_key = '86fbba2c96b5252a51879bc23af1f41e';
const num = 300;
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;

const method_interest = 'flickr.interestingness.getList';
const interest_url = `${baseURL}${method_interest}`;

const myId = '194260994@N06';
const method_user = 'flickr.people.getPhotos';
const user_url = `${baseURL}${method_user}&user_id=${myId}`;

fetch(user_url)
	.then((res) => res.json())
	.then((json) => {
		console.log(json);

		const items = json.photos.photo;
		let tags = '';

		items.forEach((item) => {
			tags += `
      <li class="item">
        <div>
          <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
            <img src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg'>
          </a>
          <p>${item.title === '' ? 'Have a good day!' : item.title}</p>
        </div>
      </li>
      `;
		});
		wrap.innerHTML = tags;
		//isoLayout 처음 적용시 이미지 카드가 겹치는 원인
		//imgDOM은 생성되었지만 해당 돔에 수반되는 소스이미지가 아직 렌더링되지 않은상테에서 isoLayout구문이 호출되었기 때문
		//해결방법 - 동적으로 만들어진 모든 imgDOM을 반복돌면서 onload이벤트를 연결해서 모든 소스이미지까지 렌더링 완료된 시점에 isoLayout호출
		const imgs = wrap.querySelectorAll('img');
		let count = 0;

		for (const el of imgs) {
			el.onload = () => {
				count++; //이미지의 소스이미지가 랜더링 완료될때마다 증가
				console.log(count);
				//소스이미지의 랜더링 완료된 숫자의 imgDOM의 객체의 수가 동일할때
				//모든 imgDOM에 해당되는 소스이미지가 완료되는 순간
				//이때 isoLayout 호출
				count === imgs.length && isoLayout();
				//count === imgs.length ? isoLayout() : null;
			};
		}
	});

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}
