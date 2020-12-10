# MediumClone 
[![Build Status](https://travis-ci.com/json9512/mediumclone.svg?branch=main)](https://travis-ci.com/json9512/mediumclone) [![Build status](https://ci.appveyor.com/api/projects/status/1thg3wucfety9ga0?svg=true)](https://ci.appveyor.com/project/json9512/mediumclone) [![Coverage Status](https://coveralls.io/repos/github/json9512/mediumclone/badge.svg?branch=main)](https://coveralls.io/github/json9512/mediumclone?branch=main) [![Maintainability](https://api.codeclimate.com/v1/badges/24b9d515ac7e40820317/maintainability)](https://codeclimate.com/github/json9512/mediumclone/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/24b9d515ac7e40820317/test_coverage)](https://codeclimate.com/github/json9512/mediumclone/test_coverage) 


Medium 같은 서비스를 구현하는 방법을 배우고자 시작한 클론 코딩 프로젝트입니다.

# 목적

- Medium 같은 서비스를 아래의 기능들로 구현:
    - 유저 인증 & 권한 부여
    - 블로그 글 읽기
    - 블로그 글 쓰기
    - 블로그 like 하기
    - ~~블로그에 코멘트 하기~~
- Postgresql 과 연동하기
- Redis cache 연동하기
- Docker 로 docker image를 만들고 docker hub에 이미지 배포하기
- 클라우드에 배포 (아마도?)

# 사용 할 프레임워크 

- Express
- Redis
- Psql
- Docker
- Travis (CI, Linux 환경 테스트)
- Appveyor (CI, Windows 환경 테스트)
- mocha, sinon-chai, chai, nyc, supertest, coveralls 테스트 및 visualization

# 아키텍쳐 

클론 코딩이기 때문에 server, redis, psql 을 한 instance에서 구동하여 monolothic 한 아키텍쳐를 구성 할 것입니다. 

실제로 이런 서비스를 런칭한다면 아키텍쳐는 MSA나 SOA 형식으로 만들어질 것입니다. 

# 과정

개발일지는 [여기](https://www.github.com/json9512/mediumclone/blob/master/Progress_kr.md)에 있습니다.

# 결과