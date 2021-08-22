import { setup, suite, test } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { LabelModule } from "../../src/api_module";

suite("LabelModule", function () {
  let module;

  setup(function () {
    module = new LabelModule("http://example.org/api");
  });

  test("should correctly call index path", async function () {
    const index = module.index({ device_id: "abc", secret: "123" });
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(fetchMock.lastUrl(), "http://example.org/api/labels?page=1");
  });
});
