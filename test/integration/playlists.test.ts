import { setup, suite, test, teardown } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { PlaylistModule } from "../../src/api_module";

suite("PlaylistModule", function () {
  let module;

  setup(function () {
    module = new PlaylistModule("http://example.org/api");
  });

  teardown(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall().url,
      "http://example.org/api/playlists?page=1",
    );
  });
});
