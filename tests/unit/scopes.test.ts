/* eslint-disable @typescript-eslint/no-unused-vars */
/* We need to import mocha even if we don't use it */
import * as mocha from "mocha";
/* eslint-enable @typescript-eslint/no-unused-vars */

import { expect } from "chai";

import {
  AlbumsScope,
  ArtistsScope,
  Scope,
  TracksScope,
} from "../../src/scopes";

describe("Scope", () => {
  it("should correctly create scope from key and query", () => {
    const scope = new Scope().addScope("key", "query");
    expect(scope.finalQuery).to.equal("&key=query");
  });

  it("should correctly create scope from key and array of queries", () => {
    const scope = new Scope().addScopesFromArray("key", ["1", "2", "3"]);
    expect(scope.finalQuery).to.equal("&key=1&key=2&key=3");
  });

  it("should correctly combine multiple scopes", () => {
    const scope = new Scope().addScope("key", "query");
    scope.addScope("key2", "query2");
    expect(scope.finalQuery).to.equal("&key=query&key2=query2");
  });
});

describe("AlbumsScope", () => {
  it("should return correct query for artist", () => {
    const scope = new AlbumsScope().artist(1);
    expect(scope.finalQuery).to.equal("&artist_id=1");
  });

  it("should return correct query for filter", () => {
    const scope = new AlbumsScope().filter("test");
    expect(scope.finalQuery).to.equal("&filter=test");
  });

  it("should return correct query for label", () => {
    const scope = new AlbumsScope().label(1);
    expect(scope.finalQuery).to.equal("&label=1");
  });

  it("should return correct query for labels", () => {
    const scope = new AlbumsScope().labels([1, 2, 3]);
    expect(scope.finalQuery).to.equal("&labels=1&labels=2&labels=3");
  });
});

describe("ArtistsScope", () => {
  it("should return correct query for filter", () => {
    const scope = new ArtistsScope().filter("test");
    expect(scope.finalQuery).to.equal("&filter=test");
  });
});

describe("TracksScope", () => {
  it("should return correct query for albums", () => {
    const scope = new TracksScope().album(1);
    expect(scope.finalQuery).to.equal("&album_id=1");
  });

  it("should return correct query for artists", () => {
    const scope = new TracksScope().artist(1);
    expect(scope.finalQuery).to.equal("&artist_id=1");
  });

  it("should return correct query for filter", () => {
    const scope = new TracksScope().filter("test");
    expect(scope.finalQuery).to.equal("&filter=test");
  });

  it("should return correct query for genre", () => {
    const scope = new TracksScope().genre(1);
    expect(scope.finalQuery).to.equal("&genre_id=1");
  });
});
