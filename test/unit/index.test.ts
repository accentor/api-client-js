import { suite, test } from "mocha";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { createApiClient } from "../../src/index";

suite("create API client", function () {
  test("should create api client from baseURL", function () {
    const client = createApiClient("https://api.example.com/api");
    assert.hasAllKeys(client, [
      "albums",
      "artists",
      "auth_tokens",
      "codec_conversions",
      "codecs",
      "cover_filenames",
      "genres",
      "image_types",
      "labels",
      "locations",
      "plays",
      "rescan",
      "tracks",
      "users",
    ]);
  });
});
