import { setup, suite, test } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { LocationModule } from "../../src/api_module";

suite("LocationModule", function () {
  let module;

  setup(function () {
    module = new LocationModule("http://example.org/api");
  });

  test("should correctly call index path", async function () {
    const index = module.index({ device_id: "abc", secret: "123" });
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.lastUrl(),
      "http://example.org/api/locations?page=1"
    );
  });
});
