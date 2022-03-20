import { expect } from "chai";
import mongoose from "mongoose";

describe("mongo db connection", () => {
    it("db connects successfully", () => {
        expect(mongoose.connection.readyState).to.equal(1);
    });
});
