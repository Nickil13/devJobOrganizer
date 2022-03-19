import request from "supertest";
import createServer from "../../../src/server";

const app = createServer();

describe("auth routes", function () {
    it("/auth responds with 200", function (done) {
        request(app).get("/auth").expect(200, done);
    });
});
