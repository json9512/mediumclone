import { expect, server, BASE_URL } from './setup';

describe('Editor page test', () => {
  it('unauthenticated user redirect to /login', done => {
    server
      .get(`${BASE_URL}/editor`)
      .expect(302)
      .end((err, res) => {
        expect(res.status).to.equal(302);
        expect('Location', '/login')
        done();
      });
  });
});