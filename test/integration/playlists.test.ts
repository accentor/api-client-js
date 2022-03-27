import { setup, suite, test, teardown } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { GenreModule } from "../../src/api_module";

suite("GenreModule", function () {
  let module;

  setup(function () {
    module = new GenreModule("http://example.org/api");
  });

  teardown(fetchMock.resetHistory);

  test("should correctly call index path", async function () {
    const index = module.index({ device_id: "abc", secret: "123" });
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.lastUrl(),
      "http://example.org/api/playlists?page=1"
    );
  });
});
