import { suite, test, beforeEach, afterEach, assert } from "vitest";
import fetchMock from "fetch-mock";
import { PlayModule } from "../../src/api_module";

suite("PlayModule", function () {
  let module: PlayModule;

  beforeEach(function () {
    module = new PlayModule("http://example.org/api");
  });

  afterEach(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall()!.url,
      "http://example.org/api/plays?page=1",
    );
  });
});
