import { expect, server, BASE_URL } from './setup';

describe('Home page test', () => {
  it('GET /: render home page', done => {
    server
      .get(`${BASE_URL}/`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8')
        expect(res.text).to.contains(
          'A long time ago in a galaxy far, far away . .'
        );
        done();
      });
  });
});
