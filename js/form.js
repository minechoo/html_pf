/*
1. submit 버튼에 폼 전송 이벤트 열결
2. 각 폼 항목마다의 인증함수 정의
3. 각 함수마다 인증여부에 따라 true, false값 리턴
4. 전송버튼 클릭시 각 함수에서 하나라도 false 값을 리턴시 기본전송기능 막음
*/

const form = document.querySelector('#member');
const btnSubmit = document.querySelector('input[type=submit]');
console.dir(document.querySelector('select[name=edu]'));

btnSubmit.addEventListener('click', (e) => {
	if (!isText('userid', 5)) e.preventDefault();
	if (!isText('comments', 10)) e.preventDefault();
	if (!isPwd('pwd1', 'pwd2', 5)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
});

//text 항목 인증함수
function isText(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const txt = input.value;
	if (txt.length < len) {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `텍스트를 ${len} 글자이상 입력해 주세요`;
		input.closest('td').append(errMsg);
	} else {
		resetErr(input);
		return true;
	}
}

//비밀번호 인증함수
function isPwd(pwd1, pwd2, len) {
	const pwdEl1 = form.querySelector(`[name=${pwd1}]`);
	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[!@#$%^&*()_+]/;
	const pwd1_val = form.querySelector(`[name=${pwd1}]`).value;
	const pwd2_val = form.querySelector(`[name=${pwd2}]`).value;

	if (pwd1_val !== pwd2_val || pwd1_val.length < len || !num.test(pwd1_val) || !eng.test(pwd1_val) || !spc.test(pwd1_val)) {
		resetErr(pwdEl1);
		const errMsg = document.createElement('p');
		errMsg.innerText = `비밀번호는 ${len}글자 이상 특수문자, 영문, 숫자를 모두 포함하세요.`;
		pwdEl1.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(pwdEl1);
		//pwd1_val === pwd2_val && pwd1_val.length > len
		return true;
	}
}

//email 인증함수
function isEmail(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const email = form.querySelector(`[name=${name}]`).value;
	if (/@/.test(email)) {
		const [forwardTxt, backwardTxt] = email.split('@');
		if (!forwardTxt || !backwardTxt) {
			resetErr(input);
			const errMsg = document.createElement('p');
			errMsg.innerText = `@앞쪽이나 뒤쪽에 문자값이 없습니다`;
			input.closest('td').append(errMsg);
			return false;
		} else {
			if (!/\./.test(backwardTxt)) {
				resetErr(input);
				const errMsg = document.createElement('p');
				errMsg.innerText = `@뒤쪽에 서비스명이 올바른지 확인하세요`;
				input.closest('td').append(errMsg);
				return false;
			}
		}
	} else {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `이메일주소에 @를 포함시키세요`;
		input.closest('td').append(errMsg);
		return false;
	}
}

function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	let isChecked = false;
	//현재 반복도는 체크요소에 하나라도 체크되어 있으면
	//지역변수 isChecked 를 true로 변경
	for (const input of inputs) input.checked && (isChecked = true);
	if (!isChecked) {
		resetErr(inputs);
		const errMsg = document.createElement('p');
		errMsg.innerText = `항목을 하나이상 선택하세요`;
		inputs[0].closest('td').append(errMsg);
		return false;
	} else {
		resetErr(inputs);
		return true;
	}
}

function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;

	if (value === '') {
		resetErr(input);
		const errMsg = document.createElement('p');
		errMsg.innerText = `해당 요소중에 하나를 선택해주세요.`;
		input.closest('td').append(errMsg);
		return false;
	} else {
		resetErr(input);
		return true;
	}
}

function resetErr(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const arrMsg = el.closest('td').querySelectorAll('p');
	if (arrMsg.length > 0) el.closest('td').querySelector('p').remove();
}
