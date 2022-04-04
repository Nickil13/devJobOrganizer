import { User } from "../../../models/UserModel";
import request from "supertest";
import createServer from "../../../server";
import chai from "chai";
let should = chai.should();

const app = createServer();
const defaultUser: { name: string; email: string; password: string } = {
    name: "Piper",
    email: "piper@example.com",
    password: "123",
};
let token: string;
let defaultId: string;

describe("Users", () => {
    // Add default user
    beforeEach((done) => {
        request(app)
            .post("/api/auth/user")
            .send(defaultUser)
            .expect(200)
            .end(function (err) {
                if (err) return done();
                return done();
            });
    });

    // Login default user
    beforeEach((done) => {
        request(app)
            .post("/api/auth")
            .send({ email: defaultUser.email, password: defaultUser.password })
            .expect(200)
            .end(function (err, res) {
                token = res.body.token;
                defaultId = res.body.user._id;
                if (err) return done();
                return done();
            });
    });

    afterEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });

    describe("/GET/:id user", function () {
        it("should GET a user by the given id", function (done) {
            request(app)
                .get(`/api/users/${defaultId}`)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.be.a("object");
                    res.body.should.have.property("name");
                    res.body.should.have.property("email");
                    res.body.should.have.property("password");
                    res.body.should.have.property("applications");
                    res.body.should.have.property("_id").eql(defaultId);
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe("/GET/:id - user doesn't exist", function () {
        it("should fail, since the user with that id doesnt exist", function (done) {
            var id = "612d738780ed367e08c8d671";
            request(app)
                .get(`/api/users/${id}`)
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

    describe("/PUT edit user", function () {
        it("should successfully update the user's name", function (done) {
            request(app)
                .put(`/api/users/${defaultId}`)
                .set({ Authorization: `Bearer ${token}` })
                .send({ name: "Piper1" })
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property("name").eql("Piper1");
                    if (err) return done();
                    return done();
                });
        });
    });

    describe("/DELETE user", function () {
        it("should successfully delete a user by id", function (done) {
            request(app)
                .delete(`/api/users/${defaultId}`)
                .auth(token, { type: "bearer" })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have
                        .property("message")
                        .eql("User successfully removed");
                    if (err) return done(err);
                    return done();
                });
            // });
        });
    });
});
