/*
1. submit 버튼에 폼 전송 이벤트 열결
2. 각 폼 항목마다의 인증함수 정의
3. 각 함수마다 인증여부에 따라 true, false값 리턴
4. 전송버튼 클릭시 각 함수에서 하나라도 false 값을 리턴시 기본전송기능 막음
*/

const form = document.querySelector('#member');
const btnSubmit = document.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	if (!isText('userid', 5)) e.preventDefault();
	if (!isText('comments', 10)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	// if (!isCheck()) e.preventDefault();
	// if (!isSelect()) e.preventDefault();
});

//text 항목 인증함수
function isText(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const txt = input.value;
	if (txt.length < len) {
		alert('입력한 텍스틑 항목을 5글자 이상 입력하세요');
	} else {
		return true;
	}
}

//비밀번호 인증함수
function isPwd(pwd1, pwd2, len) {
	const pwd1_val = form.querySelector(`[name=${pwd1}]`).value;
	const pwd2_val = form.querySelector(`[name=${pwd2}]`).value;

	if (pwd1_val !== pwd2_val || pwd1_val.length < len) {
		alert(`비밀번호 항목 2개를 동일하고 입력하고 ${len}글자 이상 입력하세요`);
		return false;
	} else {
		//pwd1_val === pwd2_val && pwd1_val.length > len
		return true;
	}
}

//email 인증함수
function isEmail(name, len) {
	const email = form.querySelector(`[name=${name}]`).value;
	if (email.indexOf('@') < 0 || email.length < len) {
		alert('이메일주소에 @를 포함시키고 6글자 이상 입력하세요.');
		return false;
	} else {
		return true;
	}
}

function isCheck(name) {
	return true;
}

function isSelect(name) {
	return true;
}
