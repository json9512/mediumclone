import { expect, server, BASE_URL } from './setup';

describe('myposts page test', () => {
  it('unauthenticated user redirect to /login', done => {
    server
      .get(`${BASE_URL}/myposts`)
      .expect(302)
      .end((err, res) => {
        expect(res.status).to.equal(302);
        expect('Location', '/login')
        done();
      });
  });
});
