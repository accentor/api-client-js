import fetchMock from "fetch-mock";

/*
 * Set up mockFetch and add routes
 */

fetchMock.mockGlobal();
fetchMock.get(
  {
    path: "/api/albums?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/artists?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/auth_tokens?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/codec_conversions?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/codecs?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/cover_filenames?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/genres?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/image_types?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/labels?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/locations?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/playlists?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/plays?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/rescans?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/tracks?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
fetchMock.get(
  {
    path: "/api/users?page=1",
  },
  {
    body: "[]",
    headers: { "x-total-pages": 1 },
  },
);
