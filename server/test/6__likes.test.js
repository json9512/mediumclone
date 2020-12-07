import { expect, server, BASE_URL, sample_document, sample_username } from './setup';

describe('/like endpoint test', () => {
    it('PATCH /like: increment like counter', done=>{
        // First create a post with 0 likes
        let id = "none";
        const document = sample_document;
        const comments = {msg: "Testing"};
        const likes = 0;
        let data = {id, document, comments, likes}

        // Create new post with the test user
        server
        .post(`${BASE_URL}/editor`)
        .send(data)
        .expect(201)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(201);
            expect(res.body.result).to.be.instanceOf(Array);
            // Retrieve the ID and fetch the likes endpoint with the id
            id = res.body.result[0].id
            

            server.patch(`${BASE_URL}/like`)
                .send({id: id})
                .expect(200)
                .end((err, res) => {
                    if(err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.result).to.be.a('array');
                    expect(res.body.result[0]).to.have.property('id')
                    expect(res.body.result[0]).to.have.property('likes')
                    expect(res.body.result[0].id).to.equal(id)
                    expect(res.body.result[0].likes).to.equal(likes+1)
                    done();
            })   
        })

    })

    
});
