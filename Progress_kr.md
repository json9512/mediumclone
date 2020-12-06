# 개발일지

Medium 클론 코딩을 하며 배운 것들을 주별로 정리 한 문서입니다. 

<br>

소요시간: 매일 5~8 시간

<br>


# 과정 (주)

|주|날짜|한 것|이유|
|:-|:--|:----|:---|
|1|11/27|<ul><li>github 레포 만들기 및 프로젝트 구축</li></ul>|n/a|
|1|11/28|<ul><li>Mocha, sinon-chai, supertests를 이용한 테스트 코드 작성</li><li>Travis, Appveyor를 이용한 CI pipepline 구축</li><li>Heroku 배포 환경설정</li></ul>|n/a|
|1|11/29|<ul><li>Auth0를 이용한 user authentication</li></ul>|n/a|
|1|11/30|<ul><li>ProseMirror docs 정독</li><li>기본 editor 구현 후 webpack으로 pug template에 적용</li></ul>|에디터 구현|
|1|12/01|<ul><li>데이터 베이스로 post 저장 및 업데이트 구현</li></ul>|n/a|
|1|12/02|<ul><li>myposts 에서 각 post 별로 editor 로 이동 구현</li><li>~~Helmet의 기본 Content Security Policy와 wepack, pug, inline-script 의 호환성 문제에 직면함~~<br>해결</li><li>Editor/Post 페이지에 database data를 불러와서 rendering 구현</li><ul>|~~pug에서 각 post 별로 이동하는 inline script를 구현 했지만 helmet에 의해서 차단.<br> nonce나 hash값을 이용하려고 했지만 nonce는 문제를 해결하지 못 하고 hash값은 webpack에서 지원을 하지 않음.<br>결국 'unsafe-inline'을 허용함~~ <br>js 로 구현 후 문제 해결|
|1|12/03|<ul><li>Post별 like 기능 구현</li><li>Post 삭제 기능 구현</li></ul>|n/a|
|2|12/04|<ul><li>home 페이지의 컨텐츠 dynamic하게 생성</li><li>웹 앱의 기능적인 부분을 완료</li><li>마지막 디자인 적용</li></ul>|n/a|
|2|12/05|<ul><li>CI pipeline 에러 해결</li></ul>|n/a|
|2|12/06|<ul><li>유닛 테스트 케이스 추가</li></ul>|n/a|


# 구현 할 기능

Medium 클론은 Medium을 완전히 클론 하지 않을 것입니다. 

마치 Medium이 처음 개발 되는 것처럼 가장 핵심적인 기능들만 구현 할 목적입니다. 

그 기능들은 아래와 같습니다:

1. auth0를 이용한 유저 인증 
2. MediumClone에서 인기 있는 포스트 목록 보기
3. 유저는 인증후 글 작성
4. 유저는 로그인 후 글 like
5. ~~유저는 로그인 후 글 comment~~

## 더 보기

개발 과정 중 배운 것들/내린 결정에 관한 [왜WHY_Readme](https://www.github.com/json9512/mediumclone/blob/master/WHY_kr.md)
