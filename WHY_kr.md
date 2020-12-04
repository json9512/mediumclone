# 왜 Why ?
개발 과정 중 내린 결정이나 배운 것들에 관한 문서입니다.

# Learnt

- Appveyor, Travis, coverall 등 CI/CD pipeline을 설정 하는 방법을 배웠습니다. 이 [튜토리얼](https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/#top) 을 보고 기본적인 뼈대를 구축했습니다.

- Content-Security-Policy, HTTP header 등 helmet middleware를 쓰면서 웹의 기능들과 helmet의 기능에 대해 배웠습니다.

- 서버에서 template engine으로 구축하는 웹 페이지의 복잡성과 React, Vue 와 같은 Framework이 왜 사용되는지 깨닫게 되었습니다.

- webpack으로 여러가지의 파일들을 하나의 번들로 압축하는 법을 배웠습니다.

- Immediately-invoked function expression (async) 

- ProseMirror를 이용해서 기본적인 읽기/쓰기 에디터를 구현하는 방법을 배웠습니다.

# Why 

- PUG - 학교 과제 중에서 PUG를 우연히 접한 뒤, 느낌이 심플하고 나쁘지 않다고 생각하여 사용했습니다.<br>다른 이유로는 server-side-rendering 을 시도해 보기 위해, frontend application을 따로 구동 시키지 않기 위해, 그리고 프로젝트 자체가 간단 할 것이라고 착각해서 입니다...ㅠ

- express, nodejs - 처음엔 파이썬의 장고를 생각했지만, 프로젝트 자체가 심플하고 복잡하지 않다고 판단하여 빠르게 구현 가능 한 express/nodejs 를 선택 했습니다. 또한 잘 알려진 소스인 만큼 막혔을 때 stackoverflow 와 같은 곳에서 도움을 얻을 수 있을거라 판단했기 때문입니다.  

- Postgresql - MySQL, MongoDB, cloud database 등 여러가지를 고려 했지만 이미 여러차례 경험이 있었던 psql과 직접 SQL 코드 또한 작성하기 위해 postgresql을 사용했습니다.

- ProseMirror - Medium 개발자가 추천한 오픈소스 에디터라서 사용해 보았습니다. 이전에 react-wysiwyg 와 같은 에디터를 사용해 보았지만 ProseMirror 만큼 자율성이 주어지는 에디터는 얼마 없는 것 같습니다.<br> 비록 이 프로젝트에서는 에디터에 필요한 기본적인 것들로만 구현 했지만, 추후에 더 다양한 기능들이 추가 된 에디터를 구현 할 때 ProseMirror가 유용 할 것 같습니다. 