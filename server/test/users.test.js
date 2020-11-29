import { expect, server, BASE_URL } from './setup';

describe('Users page test', () => {
  it('Access users page without login', done => {
    server
      .get(`${BASE_URL}/users`)
      .expect(302)
      .end((err, res) => {
        expect(res.status).to.equal(302);
        done();
      });
  });
});