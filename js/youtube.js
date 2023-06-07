//외부 api서비스 token 값 발행
//외부 api 데이터를 가져고기 위해 url생성을 위한 api 사용법 숙지

//자주쓰는 문자열 관련메서드
//문자열.substr(시작문자열순서, 자를 문자열 갯수) : 특정문자열에서 원하는 위치에서 원하는 글자갯수 잘라서 반환
//문자열.split('구분자) : 구분자를 기점으로 문자열을 나눠서 배열로 변환

//이벤트 위임( Event Delegate)
//현재 없는 요소에 이벤트를 전달하기위해 항상 있는 상위 부모요소에 이벰트를 위임 (이벤트 버블링 활용)

//e.currentTarget : 현재 이벤트 구문상에 선택자로 연결되어 있는 요소를 지칭
//e.target: 화면상에서 이벤트가 발생하는 대상을 지칭

const wrap = document.querySelector('.youtube .wrap');

const key = 'AIzaSyANMdnk7q2cBX8tqGJZXpVFH9bGJMOwmEc'; //api 키
const list = 'PLMafzyXZ12TPBYgeplFEdJeSMcJvb3v5u'; //class 브라우저 상단값
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

fetch(url)
	.then((data) => data.json())
	.then((json) => {
		console.log(json.items);
		let tags = '';

		json.items.forEach((item) => {
			let tit = item.snippet.title;
			let desc = item.snippet.description;
			let date = item.snippet.publishedAt;

			tags += `
        <article>
          <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
          
          <div class="txt">
          <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
          <span>${date.split('T')[0].split('-').join('.')}</span>
          </div>          

          <div class="pic">
          <img src=${item.snippet.thumbnails.standard.url} alt=${item.snippet.resourceId.videoId}/>
          </div>
        </article>
      `;
		});

		wrap.innerHTML = tags;
	});

wrap.addEventListener('click', (e) => {
	//console.log('e.currentTarget :', e.currentTarget);
	//console.log('e.target :', e.target);
	if (e.target.nodeName !== 'IMG') return;
	console.log(e.target.getAttribute('alt'));
});