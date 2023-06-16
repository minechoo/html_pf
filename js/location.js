const mapContainer = document.querySelector('#map');
const [btnBranch1, btnBranch2] = document.querySelectorAll('.branch li');
const position = new kakao.maps.LatLng(37.513061828815815, 127.05982069241152); //지도 위치 인스턴스
const position2 = new kakao.maps.LatLng(37.565074, 126.976582);
const mapOption = { center: position, level: 3 }; //지도 생성 옵션
const map = new kakao.maps.Map(mapContainer, mapOption); //지도 인스턴스 생성
//const marker = new kakao.maps.Marker({ position: position }); //마커 인스턴스 생성

//원하는 위치의 위도, 경도 좌표값을 디테일하게 구하는 법
//1-구글맵스에서 원하는 위치값을 찍어서 좌표값 복사
//2-카카오맵의 클릭한위치 마커찍기 샘플예제의 직접해보기 섹션에 해당 위치값을 붙여넣기
//3-해당 테스트화면에서 정밀하게 원하는 지점을 찍고 해당 코드값을 활용

const imageSrc = 'img/marker1.png'; // 마커이미지의 주소입니다
const imageSize = new kakao.maps.Size(232, 99); // 마커이미지의 크기입니다
const imageOption = { offset: new kakao.maps.Point(116, 99) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
const marker = new kakao.maps.Marker({
	position: position,
	image: markerImage, // 마커이미지 설정//
});
//마커인스턴트의 setMap함수로 지도 인스턴스 바인딩
marker.setMap(map);

const imageSrc2 = 'img/marker2.png'; // 마커이미지의 주소입니다
const imageSize2 = new kakao.maps.Size(232, 99); // 마커이미지의 크기입니다
const imageOption2 = { offset: new kakao.maps.Point(116, 99) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
const markerImage2 = new kakao.maps.MarkerImage(imageSrc2, imageSize2, imageOption2);
const marker2 = new kakao.maps.Marker({
	position: position2,
	image: markerImage2, // 마커이미지 설정//
});
//마커인스턴트의 setMap함수로 지도 인스턴스 바인딩
marker2.setMap(map);

btnBranch1.addEventListener('click', () => map.panTo(position));
btnBranch2.addEventListener('click', () => map.panTo(position2));
