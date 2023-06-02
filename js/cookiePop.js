//쿠키는 사용자의 컴퓨터에 물리적인 파일형태로 저장하는 경량의 텍스트 자료
//name=value 형식으로 저장, 쿠키 생성시 쿠키의 생성주기를 설정가능
//name=value; path=/; expires=만료일;
//document.cookie: 생성된 쿠키값 확인 가능

//문자열.indexOf(찾을문자열) : 전체 문자열에서 인수로 전달한 문자열의 순번을 반환
//전체 문자열에서 indexOf특정 문자열을 찾지 못하면 -1을 반환
//indexOf를 쓰는 이유는 -1을 통해서 전체 문자열에 특정 문자값이 있는지 없는지를 판단

const btnShow = document.querySelector('header h1');
const btnDel = document.querySelectorAll('header #gnb li')[0];
const pop = document.querySelector('#pop');
const ck = pop.querySelector('#ck');
const btnClose = pop.querySelector('.close');

//브라우저 로딩시 쿠기유무에 따라 팝업 보임, 숨김 처리
const cookieData = document.cookie;
// if (cookieData.indexOf('today=done') < 0) {
// 	//쿠키가 없을때 실행할 구문
// 	pop.style.display = 'block';
// } else {
// 	//쿠키가 있을떄 실행할 구문
// 	pop.style.display = 'none';
// }
cookieData.indexOf('today=done') < 0 ? (pop.style.display = 'block') : (pop.style.display = 'none');

//쿠키 확인 이벤트
btnShow.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(document.cookie);
});

//쿠키 삭제 이벤트
btnDel.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
	alert('쿠키삭제 완료');
});

//팝업 닫기 이벤트
btnClose.addEventListener('click', (e) => {
	e.preventDefault();
	//체크박스에 체크가 되어있으면 쿠키생성, 그렇지 않으면 해당 구문 무시
	if (ck.checked) setCookie('today', 'done', 1);
	pop.style.display = 'none';
});

function setCookie(name, value, expires) {
	let today = new Date();
	let duedate = today.getDate() + expires;
	today.setDate(duedate);
	const result = today.toGMTString();
	document.cookie = `${name}=${value}; path=/; expires=${result}`;
}
