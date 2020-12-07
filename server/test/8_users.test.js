import { expect, server, BASE_URL } from './setup';

describe('Users endpoint test', () => {
  it('GET /users: Get user information', done => {
    server
      .get(`${BASE_URL}/users`)
      .expect(200)
      .end((err, res) => {
        // userProfile will be empty: middleware bypasses authentication on test mode
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal("respond with a resource");
        expect(res.body.userProfile).to.be.a('object');
        done();
      });
  });
});