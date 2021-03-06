'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Productshippingclasse = mongoose.model('Productshippingclasse');

var credentials,
    token,
    mockup;

describe('Productshippingclasse CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "Priority",
            slug: "priority",
            description: "asasa",
            count: 0,
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Productshippingclasse get use token', (done) => {
        request(app)
            .get('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Productshippingclasse get by id', function (done) {

        request(app)
            .post('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/productshippingclasses/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.slug, mockup.slug);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.count, mockup.count);
                        done();
                    });
            });

    });

    it('should be Productshippingclasse post use token', (done) => {
        request(app)
            .post('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.slug, mockup.slug);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.count, mockup.count);
                done();
            });
    });

    it('should be productshippingclasse put use token', function (done) {

        request(app)
            .post('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "Priority1",
                    slug: "priority1",
                    description: "fdfd",
                    count: 1,
                }
                request(app)
                    .put('/api/productshippingclasses/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        console.log(resp);
                        // assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.slug, update.slug);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.count, update.count);
                        done();
                    });
            });

    });

    it('should be productshippingclasse delete use token', function (done) {

        request(app)
            .post('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productshippingclasses/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be productshippingclasse get not use token', (done) => {
        request(app)
            .get('/api/productshippingclasses')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be productshippingclasse post not use token', function (done) {

        request(app)
            .post('/api/productshippingclasses')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be productshippingclasse put not use token', function (done) {

        request(app)
            .post('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/productshippingclasses/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be productshippingclasse delete not use token', function (done) {

        request(app)
            .post('/api/productshippingclasses')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productshippingclasses/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Productshippingclasse.remove().exec(done);
    });

});