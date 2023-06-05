const wrap = document.querySelector('.department .wrap');

// fatchDepart();
// async function fatchDepart() {
// 	const result = await fetch('/DB/department.json');
// 	const data = await result.json();
// 	console.log(data);
// }

/*
fetch('데이터 URL)
.then((data)=> data.json()).then.((json)=>{
  //데이터가 성공적으로 받아졌을때 실행할 구문
})
.catch(()=>{
  //실패했을때 구문
})
*/

//외부 데이터 가져오는 공식
/*
fetch('데이터 url').then((data) => {
  data.json()
     .then((json) => {
        //데이터가 성공적으로 받아졌을 떄 구문
        console.log(json);
     })
     .catch((err) => {
        //응답에 실패했을 때 실행되는 구문
        console.log(err);
     });
});
*/

let tags = '';

fetch('/DB/department.json')
	.then((res) => {
		return res.json(); //promise 객체 반환
	})
	.then((data) => {
		const mamberData = data.members;
		mamberData.map((data, _) => {
			tags += `
      <article>
        <div class="pic">
          <img src="img/${data.pic}" />
        </div>
        <h2>${data.name}</h2>
        <p>${data.position}</p>
      </article>
      `;
			console.log(tags);
		});
		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
