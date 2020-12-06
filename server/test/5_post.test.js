import { expect, server, BASE_URL, sample_document, sample_username } from './setup';

describe('Post page test', () => {
    it('GET/ Load empty post page', done=>{
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

    it('POST /post with post ID', done => {
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
});
