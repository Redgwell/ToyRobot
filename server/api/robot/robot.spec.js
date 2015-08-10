'use strict';

require('should');
var app = require('../../app');
var request = require('supertest');

describe('http assertions', function() {

  function assertIs404(method, url, done) {
    request(app)[method](url)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Object);
        res.body.error.should.be.instanceof(String);
        done();
      });
  }

  describe('GET /api/robots', function() {

    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/robots')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });
  });

  describe('POST /api/robots', function() {

    it('should respond with new robot', function(done) {
      request(app)
        .post('/api/robots')
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.id.should.be.instanceof(String);
          res.body.x.should.equal(0);
          res.body.y.should.equal(0);
          res.body.direction.should.equal('North');
          done();
        });
    });

    it('should create a new robot at the specified position', function(done) {
      var x = 2, y = 4, direction = 'East';
      request(app)
        .post('/api/robots')
        .send({ x: x, y: y, direction: direction })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.id.should.be.instanceof(String);
          res.body.x.should.equal(x);
          res.body.y.should.equal(y);
          res.body.direction.should.equal(direction);
          done();
        });
    });
  });

  describe('GET /api/robots/:id', function() {

    it('should respond with not found when unknown id is specified', function(done) {
      assertIs404('get', '/api/robots/123', done)
    });

    it('should respond with a robot when a valid id is specified', function(done) {
      var newRobot;
      request(app)
        .post('/api/robots')
        .end(function(err, res) {
          if (err) return done(err);

          newRobot = res.body;

          request(app).get('/api/robots/' + newRobot.id)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Object);
              res.body.id.should.equal(newRobot.id);
              done();
            });

        });

      });
  });


  describe('PUT /api/robots/:id/move', function() {

    var newRobot;

    beforeEach(function(done) {
      request(app)
        .post('/api/robots')
        .end(function(err, res) {
          if (err) return done(err);
          newRobot = res.body;
          done();
        });
    });

    it('should respond with not found when unknown id is specified', function(done) {
      assertIs404('put', '/api/robots/123/move', done)
    });

    it('should move the with a robot when a valid id is specified', function(done) {
      request(app)
        .put('/api/robots/' + newRobot.id + '/move')
        .end(function(err, res) {
          if (err) return done(err);

          var movedRobot = res.body;
          movedRobot.should.be.instanceof(Object);
          movedRobot.id.should.equal(newRobot.id);
          movedRobot.x.should.equal(newRobot.x);
          movedRobot.y.should.equal(newRobot.y + 1);
          done();
        });

      });
  });

});


// router.put('/:id/move', controller.move);
// router.get('/:id/report', controller.getReport);
// router.put('/:id/rotate', controller.rotate);
