import { setup, suite, test } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
global.fetch = fetchMock.sandbox();
fetchMock.get(
  {
    url: "http://example.org/api/codecs?page=1",
    headers: { "x-secret": "123", "x-device-id": "abc" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  }
);

import { CodecModule } from "../../src/api_module";

suite("CodecModule", function () {
  let module;

  setup(function () {
    module = new CodecModule("http://example.org/api");
  });

  test("should correctly call index path", async function () {
    const index = module.index({ device_id: "abc", secret: "123" });
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
  });
});
