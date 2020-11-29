import { expect, server, BASE_URL } from './setup';

describe('Index page test', () => {
  it('gets base url', done => {
    server
      .get(`${BASE_URL}/`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8')
        expect(res.text).to.contains(
          'Son'
        );
        done();
      });
  });
});
