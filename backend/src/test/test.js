let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');

let token;

describe('HKID verification', () => {
  describe('/Post user/verification', () => {
    it('it should have token', (done) => {
      chai.request(server)
      .post('/v1/user/verification')
      .send({hkid:'L4372088'})
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.have.property('success').and.to.be.a('boolean');
        (res.body.data).should.have.property('token').and.to.be.a('string');
        token = res.body.data.token
        done();
      });
    });
  });
});

describe('User vote', () => {
  describe('/Post user/vote', () => {
    it('it should have token', (done) => {
      chai.request(server)
      .post('/v1/user/vote')
      .set('token', token)
      .send({campaign_id:1,option_id:1})
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.have.property('success').and.to.be.a('boolean');
        done();
      });
    });
  });
});

describe('Campaign List', () => {
  describe('/Get campaign', () => {
    it('it should GET all the campaign', (done) => {
      chai.request(server)
      .get('/v1/campaign')
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.have.property('success').and.to.be.a('boolean');
        (res.body).should.have.property('data').and.to.be.a('array');
        done();
      });
    });
  });
});

describe('Campaign', () => {
  describe('/Get campaign/1', () => {
    it('it should GET a campaign', (done) => {
      chai.request(server)
      .get('/v1/campaign/1')
      .set('token', token)
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.have.property('success').and.to.be.a('boolean');
        (res.body).should.have.property('data').and.to.be.a('object');
        (res.body.data).should.have.property('vote_options').and.to.be.a('array');
        done();
      });
    });
  });
});

describe('Campaign Result', () => {
  describe('/Get campaign/1/result', () => {
    it('it should GET a campaign result', (done) => {
      chai.request(server)
      .get('/v1/campaign/1/result')
      .set('token', token)
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.have.property('success').and.to.be.a('boolean');
        (res.body).should.have.property('data').and.to.be.a('object');
        (res.body.data).should.have.property('vote_options').and.to.be.a('array');
        done();
      });
    });
  });
});
describe('User Vote Record', () => {
  describe('/Get user/voteRecord', () => {
    it('it should GET all vote record', (done) => {
      chai.request(server)
      .get('/v1/user/voteRecord')
      .set('token', token)
      .end((err, res) => {
        (res).should.have.status(200);
        (res.body).should.have.property('success').and.to.be.a('boolean');
        (res.body).should.have.property('data').and.to.be.a('object');
        done();
      });
    });
  });
});
