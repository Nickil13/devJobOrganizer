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

    describe("/GET/:id user", function () {
        it("it should GET a user by the given id", function (done) {
            let user = new User({
                id: 1,
                name: "Piper",
                email: "piper@example.com",
            });

            user.save(function (err, user) {
                request(app)
                    .get(`/users/${user.id}`)
                    .send(user)
                    .end(function (err, res) {
                        res.status = 200;
                        res.body.should.be.a("object");
                        res.body.should.have.property("name");
                        res.body.should.have.property("email");
                        res.body.should.have.property("applications");
                        res.body.should.have.property("_id").eql(user.id);

                        done();
                    });
            });
        });
    });
});
