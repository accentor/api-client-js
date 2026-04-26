import { suite, test, assert } from "vitest";
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
      "playlists",
      "plays",
      "rescans",
      "tracks",
      "users",
    ]);
  });
});
