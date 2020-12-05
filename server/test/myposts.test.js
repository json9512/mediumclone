import { expect, server, BASE_URL } from './setup';

describe('Myposts page test', () => {
  it('GET myposts page', done => {
    server
      .get(`${BASE_URL}/myposts`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
        expect(res.text).to.contains(
          'Write article', 
        );
        done();
      });
  });
});
