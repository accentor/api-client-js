import { suite, test, beforeEach, afterEach, assert } from "vitest";
import fetchMock from "fetch-mock";
import { UserModule } from "../../src/api_module";

suite("UserModule", function () {
  let module: UserModule;

  beforeEach(function () {
    module = new UserModule("http://example.org/api");
  });

  afterEach(() => fetchMock.clearHistory());

  test("should correctly call index path", async function () {
    const index = module.index("123");
    const response = await index.next();
    assert(response.done);
    assert.equal(response.value.length, 0);
    assert.equal(
      fetchMock.callHistory.lastCall()!.url,
      "http://example.org/api/users?page=1",
    );
  });
});
