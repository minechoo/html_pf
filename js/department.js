const wrap = document.querySelector('.department .wrap');

// fatchDepart();
// async function fatchDepart() {
// 	const result = await fetch('/DB/department.json');
// 	const data = await result.json();
// 	console.log(data);
// }

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
        <h1>${data.name}</h1>
        <p>${data.position}</p>
      </srticle>
      `;
			console.log(tags);
		});
		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
