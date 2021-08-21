import { setup, suite, test } from "mocha";
import { assert } from "chai";

import {
  AlbumsScope,
  ArtistsScope,
  Scope,
  TracksScope,
} from "../../src/scopes";

suite("Scope", function () {
  let scope;

  setup(function () {
    scope = new Scope();
  });

  test("should correctly create scope from key and query", function () {
    scope.addScope("key", "query");
    assert.equal(scope.finalQuery, "&key=query");
  });

  test("should correctly create scope from key and array of queries", function () {
    scope.addScopesFromArray("key", ["1", "2", "3"]);
    assert.equal(scope.finalQuery, "&key=1&key=2&key=3");
  });

  test("should correctly combine multiple scopes", function () {
    scope.addScope("key", "query");
    scope.addScope("key2", "query2");
    assert.equal(scope.finalQuery, "&key=query&key2=query2");
  });
});

suite("AlbumsScope", function () {
  let scope;

  setup(function () {
    scope = new AlbumsScope();
  });

  test("should return correct query for artist", function () {
    scope.artist(1);
    assert.equal(scope.finalQuery, "&artist_id=1");
  });

  test("should return correct query for filter", function () {
    scope.filter("test");
    assert.equal(scope.finalQuery, "&filter=test");
  });

  test("should return correct query for label", function () {
    scope.label(1);
    assert.equal(scope.finalQuery, "&label=1");
  });

  test("should return correct query for labels", function () {
    scope.labels([1, 2, 3]);
    assert.equal(scope.finalQuery, "&labels=1&labels=2&labels=3");
  });
});

suite("ArtistsScope", function () {
  let scope;

  setup(function () {
    scope = new ArtistsScope();
  });

  test("should return correct query for filter", () => {
    scope.filter("test");
    assert.equal(scope.finalQuery, "&filter=test");
  });
});

suite("TracksScope", () => {
  let scope;

  setup(function () {
    scope = new TracksScope();
  });

  test("should return correct query for albums", () => {
    scope.album(1);
    assert.equal(scope.finalQuery, "&album_id=1");
  });

  test("should return correct query for artists", () => {
    scope.artist(1);
    assert.equal(scope.finalQuery, "&artist_id=1");
  });

  test("should return correct query for filter", () => {
    scope.filter("test");
    assert.equal(scope.finalQuery, "&filter=test");
  });

  test("should return correct query for genre", () => {
    scope.genre(1);
    assert.equal(scope.finalQuery, "&genre_id=1");
  });
});
