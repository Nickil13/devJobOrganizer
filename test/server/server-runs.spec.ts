import createServer from "../../src/server";
import request from "supertest";

const app = createServer();

describe("server checks", function () {
    it("server is created without error", function (done) {
        request(app).get("/").expect(200, done);
    });
});
