import { expect, server, BASE_URL, sample_document} from './setup';

describe('List page test', () => {
  it('GET /: render page with all posts', done => {
    server
      .get(`${BASE_URL}/list`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
        expect(res.text).to.contains(
          'iamMando', 'theChild', 'StormTrooper' 
        );
        done();
      });
  });

  it('GET /list/tags: page render with given tag - fortnite', done => {
    // Test myposts view
    server
    .get(`${BASE_URL}/list/tags?tag=fortnite`)
    .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.text).to.contains(
        'posts-title', 'Mando joins FORTNITE'
        );
        done();
    });
    })

    it('GET /list/author: page render with given author - StormTrooper', done => {
        // Test myposts view
        server
        .get(`${BASE_URL}/list/author?name=StormTrooper`)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.text).to.contains(
            'posts-title', 'StormTrooper'
            );
            done();
        });
        })
});
