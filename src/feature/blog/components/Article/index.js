import React from "react";

import "./index.css";

function zeroPad(value, len) {
  const str = "0000000000" + value.toString();
  return str.substring(str.length - len);
}

/* 파라미터 참고: https://unsplash.com/documentation#supported-parameters */
/*
  라이트하우스 분석
  * 이미지 크기 적절하게 설정하기 이슈 개선

  Image CDN 사용 (서버 -> cdn -> 클라)
  - 캐시 서버CDN을 이용해서 원하는 사이즈로 조절하여 컨텐츠를 받아옴
  - 해당 예시는 upsplash(CDN역할)에서 제공하는 이미지 처리 파라미터를 사용. 
*/
function getParametersForUnsplash({ width, height, quality, format }) {
  return `?w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop`;
}

/*
 * 파라미터로 넘어온 문자열에서 일부 특수문자를 제거하는 함수
 * (Markdown으로 된 문자열의 특수문자를 제거하기 위함)
 * */

/*
* Minify JavaScript, reduce JS execution time 해결
네트워크 > 성능 탭 > 해당 컴포넌트의 removeSpecialCharacter 함수가 오래 실행 됨.

문제: for문과 while문 중첩으로 비효율적이게 문자를 제거하고 있음. 

1. 특수 문자 효율적 제거하기!
  - replace 함수 / 정규식 사용
  - 마크다운 특수문자 제거 라이브러리 사용 remove-markdown
2. 작업하는 양 줄이기
  - 대략 작업해야 하는 양을 지정해서 해결.
 */

function removeSpecialCharacter(str) {
  let _str = str.substring(0, 300);
  _str = _str.replace(/[#_*~&;!\[\]`>\n=-]/g, "");

  return _str;
}

function Article(props) {
  const createdTime = new Date(props.createdTime);
  return (
    <div className={"Article"}>
      <div className={"Article__summary"}>
        <div className={"Article__summary__title"}>{props.title}</div>
        <div className={"Article__summary__desc"}>
          {removeSpecialCharacter(props.content)}
        </div>
        <div className={"Article__summary__etc"}>
          {createdTime.getFullYear() +
            "." +
            zeroPad(createdTime.getMonth() + 1, 2) +
            "." +
            zeroPad(createdTime.getDate(), 2)}
        </div>
      </div>
      <div className={"Article__thumbnail"}>
        <img
          src={
            props.image +
            getParametersForUnsplash({
              width: 200,
              height: 200,
              quality: 80,
              format: "jpg",
            })
          }
          alt="thumbnail"
        />
      </div>
    </div>
  );
}

export default Article;
