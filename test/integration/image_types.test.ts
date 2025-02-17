import { setup, suite, test, teardown } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { ImageTypeModule } from "../../src/api_module";

suite("ImageTypeModule", function () {
  let module;

  setup(function () {
    module = new ImageTypeModule("http://example.org/api");
  });

  teardown(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall().url,
      "http://example.org/api/image_types?page=1",
    );
  });
});
