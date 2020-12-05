import { expect, server, BASE_URL, sample_document, sample_username } from './setup';

describe('Editor page test', () => {
  it('GET editor page', done => {
    server
      .get(`${BASE_URL}/editor`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8');
        expect(res.text).to.contains(
          'Save', 'Delete'
        );
        done();
      });
  });

  it('POST /editor: Add new post into database', done => {
    const id = "none";
    const document = sample_document;
    const comments = {msg: "Testing"};
    const likes = 0;
    const data = {id, document, comments, likes}

    server
      .post(`${BASE_URL}/editor`)
      .send(data)
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
          expect(item.username).to.be.a('string')
          expect(item.document).to.be.a('object')
          expect(item.comments).to.be.a('object')
          expect(item.likes).to.be.a('number')
        })
        done();
      })
  });

  it('PUT /editor: Update post in database', done => {
    let id = "none";
    const document = sample_document;
    const comments = {msg: ""};
    const likes = 500;
    let data = {id, document, comments, likes}

    server
      .post(`${BASE_URL}/editor`)
      .send(data)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        // Get id from insert
        id = res.body.result[0].id
        data = {id, document, comments: {msg: "Edited"}, likes: 530}
        
        // put
        server
          .put(`${BASE_URL}/editor/update`)
          .send(data)     
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.result).to.be.instanceOf(Array);
            res.body.result.forEach( item => {
              expect(item).to.have.property('id')
              expect(item).to.have.property('username', sample_username)
              expect(item.document).to.include.keys('doc', 'selection')
              expect(item).to.have.property('comments')
              expect(item).to.have.property('likes')
              expect(item.id).to.be.a('number')
              expect(item.username).to.be.a('string')
              expect(item.document).to.be.a('object')
              expect(item.comments).to.be.a('object')
              expect(item.likes).to.be.a('number')
              expect(item.id).equal(id)
              expect(item.comments.msg).equal("Edited")
              expect(item.likes).equal(530)
            })
            
            done();
          })
      })
  });

  it('DELETE /editor: Delete post in database', done => {
    let id = "none";
    const document = sample_document;
    const comments = {msg: ""};
    const likes = 500;
    let data = {id, document, comments, likes}

    server
      .post(`${BASE_URL}/editor`)
      .send(data)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        // Get id from insert
        id = res.body.result[0].id
        data.id = id
        
        // put
        server
          .delete(`${BASE_URL}/editor/delete`)
          .send(data)     
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).equal(200)
            expect(res.body.message).equal("Post deleted")
            done();
          })
      })
  });


});