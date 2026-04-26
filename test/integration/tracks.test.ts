import { suite, test, beforeEach, afterEach, assert } from "vitest";
import fetchMock from "fetch-mock";
import { TrackModule } from "../../src/api_module";

suite("TrackModule", function () {
  let module;

  beforeEach(function () {
    module = new TrackModule("http://example.org/api");
  });

  afterEach(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall().url,
      "http://example.org/api/tracks?page=1",
    );
  });
});
