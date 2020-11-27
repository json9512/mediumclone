# MediumClone

#### [한글 README는 여기에 있어요.](https://www.github.com/json9512/mediumclone/blob/master/Korean.md)

A medium clone to learn how to make services like Medium

# Goal

- Create a Medium-like service where:
    - users are authenticated & authorized
    - read posts
    - write posts
    - like posts
    - comment posts
- Link with postgresql database
- Use of Redis cache
- Use of docker to create images and deploy service on docker hub
- Possibly deploy the application on public cloud

# Use of technical frameworks

- Express
- Redis
- Psql
- Docker

# Architecture

Since this is a clone coding project, I will have a monolithic approach and let a single server run the server, redis, and psql. 

In reality, the architecture would change either to MSA or SOA. 

# Progress

Details can be found [here](https://www.github.com/json9512/mediumclone/blob/master/Progress.md)