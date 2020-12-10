# 왜 Why ?
개발 과정 중 내린 결정이나 배운 것들에 관한 문서입니다.

# Learnt

- Appveyor, Travis, coverall 등 CI/CD pipeline을 설정 하는 방법을 배웠습니다. 이 [튜토리얼](https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/#top) 을 보고 기본적인 뼈대를 구축했습니다.

- Content-Security-Policy, HTTP header 등 helmet middleware를 쓰면서 웹의 기능들과 helmet의 기능에 대해 배웠습니다.

- 서버에서 template engine으로 구축하는 웹 페이지의 한계와 React, Vue 와 같은 Framework이 왜 사용되는지 깨닫게 되었습니다.

- webpack으로 여러가지의 파일들을 하나의 번들로 압축하는 법을 배웠습니다.

- Immediately-invoked function expression (async) 

- ProseMirror를 이용해서 기본적인 읽기/쓰기 에디터를 구현하는 방법을 배웠습니다.

# Why 

- PUG - 학교 과제 중에서 PUG를 우연히 접한 뒤, 느낌이 심플하고 나쁘지 않다고 생각하여 사용했습니다.<br>다른 이유로는 server-side-rendering 을 시도해 보기 위해, frontend application을 따로 구동 시키지 않기 위해, 그리고 프로젝트 자체가 간단 할 것이라고 착각해서 입니다...ㅠ

- express, nodejs - 처음엔 파이썬의 장고를 생각했지만, 프로젝트 자체가 심플하고 복잡하지 않다고 판단하여 빠르게 구현 가능 한 express/nodejs 를 선택 했습니다. 또한 잘 알려진 소스인 만큼 막혔을 때 stackoverflow 와 같은 곳에서 도움을 얻을 수 있을거라 판단했기 때문입니다.  

- Postgresql - MySQL, MongoDB, cloud database 등 여러가지를 고려 했지만 이미 여러차례 경험이 있었던 psql과 직접 SQL 코드 또한 작성하기 위해 postgresql을 사용했습니다.

- ProseMirror - Medium 개발자가 추천한 오픈소스 에디터라서 사용해 보았습니다. 이전에 react-wysiwyg 와 같은 에디터를 사용해 보았지만 ProseMirror 만큼 자율성이 주어지는 에디터는 얼마 없는 것 같습니다.<br> 비록 이 프로젝트에서는 에디터에 필요한 기본적인 것들로만 구현 했지만, 추후에 더 다양한 기능들이 추가 된 에디터를 구현 할 때 ProseMirror가 유용 할 것 같습니다. 

- Express-Session - passport 를 이용하기 위해서는 express-session을 사용해야 했습니다. passport를 통한 유저 authentication을 하게 되면 유저 정보가 session에 저장되고 서버 쪽에서 관리를 하게 됩니다. 그리고 user가 사용하는 frontend 또한 server-side rendering 하기 때문에 JWT를 이용한 access_token은 따로 client-side로 넘길 필요가 없다고 판단 했습니다. 이미 session_id 가 쿠키로 전해지기 때문입니다. <br>기본적으로 session을 사용하면 서버는 **stateful** 해지기 때문에 horizontal scale out에 문제가 발생 할 수 있습니다. 예를 들면 frontend 앱과 backend 앱이 나뉘어져있고 여러 개의 backend 앱이 load balancer를 통해서 작동 되고 있을 때 입니다.
<br>위와 같은 경우에는 frontend가 session id를 가지고 있어도 처음 로그인 했던 backend와 연결을 하지 못하면 backend는 유저 정보를 알 수가 없기 때문입니다. (session이 저장소에 저장되어서 backend 앱들이 따로 불러오는 것이 아닌 이상)
<br>하지만 이 medium-clone 같은 경우는 frontend 역시 서버 쪽에서 유저에게 제공하기 때문에 horizontal scale out 시에도 문제가 없을 것으로 사료됩니다.

- User table - mediumclone은 유저 이름과 프로필 이미지를 제외한 정보가 따로 저장되지 않습니다.  Auth0를 통한 인증을 하게되면 필요한 정보는 세션에 저장 되고 Auth0측이 mediumclone의 유저들을 관리하고 있기 때문에 user 테이블을 따로 구축하지 않았습니다. user 정보가 저장 되는 유일한 곳은 post 테이블이며 어떤 유저가 이 글을 적었는가에 대한 정보를 위해 session에서 유저의 이름과 이미지만 저장 합니다.

# 여담

## Load balancer 로그인 문제

앱을 어느정도 끝내고 nginx를 이용한 load balancing 테스트 중 로그인이 안되는 것을 확인 했습니다.

3개의 인스턴스를 각각 다른 포트 8000, 8001, 8002로 실행 시킨 뒤, nginx로 포트 3000으로 들어오는 요청을 load balancing 하도록 설정을 했습니다. 

하지만 그 결과, 유저가 로그인을 할 수가 없었습니다.

이유는 Auth0를 이용한 유저 인증 방식이 callback URL을 활용하고 있었기 때문입니다. 

유저가 포트 8000에 구동중인 mediumclone에서 /login으로 요청을 하게되면, Auth0 측 로그인 페이지로 이동하게 됩니다.

그후 유저가 로그인을 하게 되면, Auth0가 인증된 유저의 정보를 mediumclone 에 정해진 callback 주소로 보내주게 됩니다.

하지만 callback URL이 포트 3000으로 정해져있기 때문에 nginx를 통한 load balancing이 일어나게 되면 로그인을 요청한 포트 8000으로 callback이 호출되지 않고 8001, 8002의 callback이 호출되기 때문입니다. 

이렇게 되면 유저는 무한 로그인 화면을 볼 수 있게 됩니다. 

이러한 문제 때문에 실제로는 authentication, authorization 서버를 따로 두는 것 같습니다.

유저 관리 서버를 따로 두지 않고 이 문제를 해결하려면 mediumclone 같은 경우는 session을 쓰기 때문에 session을 cache나 database에 저장하고 인스턴스들 사이에 공유를 해야됩니다.