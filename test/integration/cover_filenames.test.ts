import { suite, test, beforeEach, afterEach, assert } from "vitest";
import fetchMock from "fetch-mock";
import { CoverFilenameModule } from "../../src/api_module";

suite("CoverFilenameModule", function () {
  let module;

  beforeEach(function () {
    module = new CoverFilenameModule("http://example.org/api");
  });

  afterEach(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall().url,
      "http://example.org/api/cover_filenames?page=1",
    );
  });
});
