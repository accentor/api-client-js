import { suite, test } from "mocha";
import { assert } from "chai";
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
      "playlist_items",
      "plays",
      "rescans",
      "tracks",
      "users",
    ]);
  });
});
