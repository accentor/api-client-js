import { suite, test, beforeEach, afterEach, assert } from "vitest";
import fetchMock from "fetch-mock";
import { AlbumModule } from "../../src/api_module";

suite("AlbumModule", function () {
  let module: AlbumModule;

  beforeEach(function () {
    module = new AlbumModule("http://example.org/api");
  });

  afterEach(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall()!.url,
      "http://example.org/api/albums?page=1",
    );
  });
});
