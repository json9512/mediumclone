import { expect, server, BASE_URL } from './setup';

describe('Users page test', () => {
  it('unauthenticated user redirect to /login', done => {
    server
      .get(`${BASE_URL}/users`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect('Location', '/login')
        done();
      });
  });
});