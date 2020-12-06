import { expect, server, BASE_URL, sample_document, sample_username, setupBeforeAfter } from './setup';

describe('Auth endpoint test', () => {
  it('GET /login: login redirects with invalid user', done => {
    server
      .get(`${BASE_URL}/login`)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(302);
        expect('Location', '/')
        done();
      });
  });

  it('GET /callback: callback redirects with invalid user', done => {
    server
      .get(`${BASE_URL}/callback`)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(302);
        expect('Location', '/')
        done();
      });
  });

  it('GET /logout: logout redirects with invalid user', done => {
    server
      .get(`${BASE_URL}/logout`)
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(302);
        expect('Location', '/')
        done();
      });
  });
});