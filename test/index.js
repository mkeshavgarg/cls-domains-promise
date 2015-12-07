'use strict';

var cls = require('continuation-local-storage'),
domain = require('domain'),
appSpace = cls.createNamespace('app'),
mongoose = require('mongoose');

describe("promise with cls", function() {

    var TestModel = mongoose.model('test_model', mongoose.Schema({value: String}));

    before(function(done) {

        var context = appSpace.createContext();
        appSpace.enter(context);

        mongoose.connect('mongodb://localhost/promise-cls-test', done);
    });

    it("should be able to retrieve the context after Model.find promise", function(done) {
        appSpace.set("value", 'find');

        TestModel.find({"nonexistent_field": "nonexistent_value"}).exec().then(function() {
            appSpace.get("value").should.be.eql('find');

            done();
        }, done);
    });

    it("should be able to retrieve the context after Model.aggregate promise", function(done) {
        appSpace.set("value", 'aggregate');

        TestModel.aggregate({$match: {"nonexistent_field": "nonexistent_value"}}).exec().then(function() {
            appSpace.get("value").should.be.eql('aggregate');

            done();
        }, done);
    });

    it("should be able to retrieve the context after Model.update promise", function(done) {
        appSpace.set("value", 'update');

        TestModel.update({}, {'value': 'update'}).exec().then(function() {
            appSpace.get("value").should.be.eql('update');

            done();
        }, done)
    });


    after(function() {
        mongoose.disconnect();
    });

});

describe("promise with domain", function() {

    var TestModel = mongoose.model('test_model1', mongoose.Schema({value: String}));

    before(function(done) {
        mongoose.connect('mongodb://localhost/promise-domain-test', done);
    });

    beforeEach(function(done) {
        var d = domain.create();
        d.run(done);
    });

    it("should be able to retrieve the context after Model.find promise", function(done) {
        process.domain.value = 'find';

        TestModel.find({"nonexistent_field": "nonexistent_value"}).exec().then(function() {
            process.domain.value.should.be.eql('find');

            done();
        }, done);
    });

    it("should be able to retrieve the context after Model.aggregate promise", function(done) {
        process.domain.value = 'aggregate';

        TestModel.aggregate({$match: {"nonexistent_field": "nonexistent_value"}}).exec().then(function() {
            process.domain.value.should.be.eql('aggregate');

            done();
        }, done);
    });

    it("should be able to retrieve the context after Model.update promise", function(done) {
        process.domain.value = 'aggregate';

        TestModel.update({}, {'value': 'update'}).exec().then(function() {
            process.domain.value.should.be.eql('aggregate');

            done();
        }, done)
    });

    after(function() {
        mongoose.disconnect();
    });

});