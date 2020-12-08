import { expect, server, BASE_URL, sample_document, sample_username, setupBeforeAfter } from './setup';

describe('Tests with empty database', () => {
  setupBeforeAfter();
  it('DELETE /editor/delete: delete post from empty database returns error', done => {
    server
      .delete(`${BASE_URL}/editor/delete`)
      .send({id: 1})
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(500);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal(`Error deleting post with 1, ${sample_username} from database`);
        done();
      })
  })

  it('POST /editor: add post to empty database returns created', done => {
    const id = "none"
    const username = sample_username;
    const document = sample_document;
    const comments = {msg: "Testing"};
    const likes = 0;
    
    server
      .post(`${BASE_URL}/editor`)
      .send({id, username, document, comments, likes})
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.result).to.be.instanceOf(Array);
        res.body.result.forEach( item => {
          expect(item).to.have.property('id')
          expect(item).to.have.property('username', sample_username)
          expect(item.document).to.include.keys('doc', 'selection')
          expect(item).to.have.property('comments')
          expect(item).to.have.property('likes')
          expect(item.id).to.be.a('number')
          expect(item.id).to.equal(1)
          expect(item.username).to.be.a('string')
          expect(item.document).to.be.a('object')
          expect(item.comments).to.be.a('object')
          expect(item.likes).to.be.a('number')
        })
        done();
      })
  })

  it('PUT /editor/update: update post in empty database returns error', done => {
    const id = 1;
    const username = sample_username;
    const document = sample_document;
    const comments = {msg: "changed"};
    const likes = 0;
    
    server
      .put(`${BASE_URL}/editor/update`)
      .send({id, username, document, comments, likes})
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error')
        expect(res.body.error).to.equal('Error updating data to database')
        done();
      })
  })

  it('PATCH /like: increment like in empty database returns error', done => {
    const id = 1;
    
    server
      .patch(`${BASE_URL}/like`)
      .send({id})
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error')
        expect(res.body.error).to.equal('Error adding like to post')
        done();
      })
  })

  it('POST /post/id: retrieve post with id in empty database returns error', done => {
    const id = 1;
    
    server
      .post(`${BASE_URL}/post/id`)
      .send({id})
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('error')
        expect(res.body.error).to.equal('Data not found')
        done();
      })
  })
})