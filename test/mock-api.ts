import fetchMock from "fetch-mock";

/*
 * Set up mockFetch and add routes
 */

fetchMock.mockGlobal();
fetchMock.get(
  {
    url: "http://example.org/api/albums?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/artists?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/auth_tokens?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/codec_conversions?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/codecs?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/cover_filenames?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/genres?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/image_types?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/labels?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/locations?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/playlists?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/plays?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/rescans?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/tracks?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    url: "http://example.org/api/users?page=1",
    headers: { Authorization: "Bearer 123" },
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
