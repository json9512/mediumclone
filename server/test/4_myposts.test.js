import { expect, server, BASE_URL, sample_document} from './setup';

describe('Myposts page test', () => {
  it('GET /myposts: render page with no content', done => {
    server
      .get(`${BASE_URL}/myposts`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
        expect(res.text).to.contains(
          'New', 
        );
        done();
      });
  });

  it('GET /myposts: page render after content added', done => {
    // Add some data before loading my page
    // Create new post with the username
    let id = "none";
    const document = sample_document;
    const comments = {msg: "Testing"};
    const likes = 0;
    let data = {id, document, comments, likes}

    server
      .post(`${BASE_URL}/editor`)
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        id = res.body.result[0].id

        // Test myposts view
        server
        .get(`${BASE_URL}/myposts`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.text).to.contains(
            'New', 'posts-title', `id=${id}`
          );
          done();
        });
      })
    }); 
});
