import { expect, server, BASE_URL } from './setup';

describe('Users page test', () => {
  it('gets users url', done => {
    server
      .get(`${BASE_URL}/users`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          'respond with a resource'
        );
        done();
      });
  });
});