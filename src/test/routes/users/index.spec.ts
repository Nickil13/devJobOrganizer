import { User } from "../../../models/UserModel";
import request from "supertest";
import createServer from "../../../server";
import chai from "chai";
let should = chai.should();

const app = createServer();

describe("Users", () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    describe("/POST user", function () {
        it("should create a new user", function (done) {
            let user = {
                name: "Piper",
                email: "piper@example.com",
                password: "123",
            };

            request(app)
                .post("/users")
                .send(user)
                .expect("Content-Type", /json/)
                .expect(201)
                .end(function (err, res) {
                    res.body.should.be.a("object");
                    res.body.should.have.property("name");
                    res.body.should.have.property("email");
                    res.body.should.have.property("password");
                    res.body.should.have.property("applications");
                    res.body.should.have.property("_id");
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe("/GET/:id user", function () {
        it("should GET a user by the given id", function (done) {
            let user = new User({
                name: "Piper",
                email: "piper@example.com",
                password: "123",
            });

            user.save((err, user) => {
                request(app)
                    .get(`/users/${user.id}`)
                    .expect(200)
                    .end(function (err, res) {
                        res.body.should.be.a("object");
                        res.body.should.have.property("name");
                        res.body.should.have.property("email");
                        res.body.should.have.property("password");
                        res.body.should.have.property("applications");
                        res.body.should.have.property("_id").eql(user.id);

                        if (err) return done(err);
                        return done();
                    });
            });
        });
    });

    describe("/GET/:id - user doesn't exist", function () {
        it("should fail, since the user with that id doesnt exist", function (done) {
            var id = "612d738780ed367e08c8d671";
            request(app)
                .get(`/users/${id}`)
                .expect(404)
                .end(function (err, res) {
                    res.body.should.have
                        .property("message")
                        .eql("User does not exist");
                    if (err) return done(err);
                    return done();
                });
        });
    });
});
