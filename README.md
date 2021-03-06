# MediumClone 
[![Build Status](https://travis-ci.com/json9512/mediumclone.svg?branch=main)](https://travis-ci.com/json9512/mediumclone) [![Build status](https://ci.appveyor.com/api/projects/status/1thg3wucfety9ga0?svg=true)](https://ci.appveyor.com/project/json9512/mediumclone) [![Coverage Status](https://coveralls.io/repos/github/json9512/mediumclone/badge.svg?branch=main)](https://coveralls.io/github/json9512/mediumclone?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/24b9d515ac7e40820317/maintainability)](https://codeclimate.com/github/json9512/mediumclone/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/24b9d515ac7e40820317/test_coverage)](https://codeclimate.com/github/json9512/mediumclone/test_coverage) 


#### [한글 README는 여기에 있어요.](https://www.github.com/json9512/mediumclone/blob/master/Korean.md)

A medium clone to learn how to make services like Medium

# Goal

- Create a Medium-like service where:
    - users are authenticated & authorized
    - read posts
    - write posts
    - like posts
    - ~~comment posts~~
- Link with postgresql database
- ~~Use of Redis cache~~
- ~~Use of docker to create images and deploy service on docker hub~~
- Possibly deploy the application on public cloud

# Use of technical frameworks

- Express
- ~~Redis~~
- Psql
- ~~Docker~~
- Travis (CI, Linux testing)
- Appveyor (CI, Windows testing)
- mocha, sinon-chai, chai, nyc, supertest, coveralls for Testing and visualization

# Architecture

Since this is a clone coding project, I will have a monolithic approach and let a single server run the server, redis, and psql. 

In reality, the architecture would change either to MSA or SOA. 

# Progress

Details can be found [here](https://www.github.com/json9512/mediumclone/blob/master/Progress.md)

# Outcome

Heroku app (may take some time to boot): [Link](https://json9512-mediumclone.herokuapp.com/)
## Main page
![mainpage](https://github.com/json9512/mediumclone/blob/main/images/main.PNG)<br>
![mainpage2](https://github.com/json9512/mediumclone/blob/main/images/main2.PNG)<br>
![mainpage3](https://github.com/json9512/mediumclone/blob/main/images/main3.PNG)<br>

## Login
![auth0](https://github.com/json9512/mediumclone/blob/main/images/auth0.PNG)<br>
![loggedin](https://github.com/json9512/mediumclone/blob/main/images/loggedin_main.PNG)<br>

## Post list && myposts page

![postlist](https://github.com/json9512/mediumclone/blob/main/images/postlist.PNG)<br>
![myposts](https://github.com/json9512/mediumclone/blob/main/images/myposts.PNG)<br>

## Editor

![editor](https://github.com/json9512/mediumclone/blob/main/images/editor.PNG)<br>

## Post
![post_by_author](https://github.com/json9512/mediumclone/blob/main/images/post_by_me.PNG)<br>
![post_by_author2](https://github.com/json9512/mediumclone/blob/main/images/post_by_me2.PNG)<br>
![post_by_author3](https://github.com/json9512/mediumclone/blob/main/images/post_by_me3.PNG)<br>
![post_by_another](https://github.com/json9512/mediumclone/blob/main/images/post.PNG)<br>

## Trending

![trending](https://github.com/json9512/mediumclone/blob/main/images/trending.PNG)<br>
![likes](https://github.com/json9512/mediumclone/blob/main/images/like_increase.PNG)<br>
![trending_2](https://github.com/json9512/mediumclone/blob/main/images/trending2.PNG)<br>
