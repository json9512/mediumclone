import { expect, server, BASE_URL, sample_document, sample_username } from './setup';

describe('Post page test', () => {
    it('GET /post: Load empty post page', done=>{
        server
            .get(`${BASE_URL}/post?id=1`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
                expect(res.text).to.contain('post-viewer')
                done();
      });
    })

    it('POST /post: with post ID', done => {
        // Create new post with the username
        let id = "none";
        const document = sample_document;
        const comments = {msg: "Testing"};
        const likes = 0;
        let data = {id, document, comments, likes}

        server
        .post(`${BASE_URL}/editor`)
        .send(data)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(201);
            expect(res.body.result).to.be.instanceOf(Array);
            // Retrieve the ID and fetch the post endpoint with the id
            id = res.body.result[0].id
            

            server.post(`${BASE_URL}/post/id`)
                .send({id: id})
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.result).to.be.a('array');
                    expect(res.body.result[0].id).to.equal(id);
                    expect(res.body.result[0].username).to.equal(sample_username);
                    done();
            })   
        })
    });

    it('POST /post/tag: with post tag', done => {
        // Create new post with the username
        let id = "none";
        let tag = "";
        const document = sample_document;
        const comments = {msg: "Testing"};
        const likes = 0;
        const tags = "darthvader";
        let data = {id, document, comments, likes, tags}

        server
        .post(`${BASE_URL}/editor`)
        .send(data)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(201);
            expect(res.body.result).to.be.instanceOf(Array);
            // Retrieve the ID and fetch the post endpoint with the id
            id = res.body.result[0].id
            tag = res.body.result[0].tags

            server.post(`${BASE_URL}/post/tag`)
                .send({id: id, tags: tag})
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.result).to.be.a('array');
                    expect(res.body.result[0]).to.have.property('tags');
                    expect(res.body.result[0].tags).to.be.a('string');
                    expect(res.body.result[0].tags).to.include(tags)
                    done();
            })   
        })
    });

    it('POST /post/list: list posts', done => { 

        server.post(`${BASE_URL}/post/list`)
            .send({id: "none"})
            .expect(200)
            .end((err, res) => {
                if(err) return done(err);
                expect(res.status).to.equal(200);
                expect(res.body.result).to.be.a('array');
                expect(res.body.result.length).to.equal(4); // There are 4 sample documents on startup
                done();
        })   
    })
   
});
