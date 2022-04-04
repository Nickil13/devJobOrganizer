import { User } from "../../../models/UserModel";
import request from "supertest";
import createServer from "../../../server";
import chai from "chai";
let should = chai.should();

const app = createServer();

describe("Auth routes", function () {
    describe("register user", function () {
        it("should create a new user", function (done) {
            let user = {
                name: "Piper",
                email: "piper@example.com",
                password: "123",
            };

            request(app)
                .post("/api/auth/user")
                .send(user)
                .expect("Content-Type", /json/)
                .expect(201)
                .end(function (err, res) {
                    const user = res.body.user;

                    user.should.be.a("object");
                    user.should.have.property("name");
                    user.should.have.property("email");
                    user.should.have.property("password");
                    user.should.have.property("applications");
                    user.should.have.property("_id");
                    res.body.should.have.property("token");
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe("login user", function () {
        it("should log in user", function (done) {
            let user = new User({
                name: "Piper",
                email: "piper@example.com",
                password: "123",
            });
            user.save((res, user) => {
                request(app)
                    .post("/api/auth")
                    .send({ email: user.email, password: user.password })
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end(function (err, res) {
                        res.body.should.have.property("user");
                        if (err) return done();
                        return done();
                    });
            });
        });
    });

    describe("login user - wrong password", function () {
        it("should fail with error message", function (done) {
            let user = new User({
                name: "Piper",
                email: "piper@example.com",
                password: "123",
            });
            user.save((res, user) => {
                request(app)
                    .post("/api/auth")
                    .send({ email: user.email, password: "1234" })
                    .expect("Content-Type", /json/)
                    .expect(400)
                    .end(function (err, res) {
                        res.body.should.have
                            .property("message")
                            .eql("Password incorrect");
                        if (err) return done();
                        return done();
                    });
            });
        });
    });
});
