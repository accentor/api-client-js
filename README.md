# Accentor API Client

## Install 
Install using your package manger of choice:
```
yarn add @accentor/api-client-js
npm install @accentor/api-client-js
```

## How to use

To intialize the API client:
```js
import { createApiClient } from "@accentor/api-client-js";

const baseURL = /* Your logic for baseURL, including /api/ */

const api = createApiClient(baseURL);
```

### Overview of functions
All functions should be provided with an auth object containing the `device_id` and `secret`. In case an auth token isn't necessary (ie. when creating an auth token), you can simply pass an empty object.

Not every function is available for every model. Only the routes available to that model can be called.
```js
// Index (some indexGenerators can be called with an optional scope, see below)
const generator = api.users.indexGenerator(auth);
const { results, done } = await generator.next();

// Create
const result = await api.tracks.create(auth, objectToCreate);

// Read
const result = await api.tracks.read(auth, id);

// Update
const result = await api.tracks.update(auth, id, object);

// Destroy
const true = await api.tracks.destroy(auth, id);

// Destroy empty
const true = await api.albums.destroyEmpty(auth, id);

// Merge
const result = await api.tracks.merge(auth, newId, oldID)
```
 
### Adding scopes to indexes
If you want to filter the items fetched by through `indexGenerator`, you can pass an optional scope. We currently have scopes for albums, artists and tracks

An example of a scope used:
```js
import { AlbumsScope } from "@accentor/api-client-js";

const scope = new AlbumsScope.label(1);
const generator = api.albums.indexGenerator(auth, scope)
```

You can create scopes in different ways:
* created on a single line `new AlbumsScope.label(id)`
* chained for more complex queries `new AlbumsScope.label(id).artist(id).filter(string)`
* created and then modified:

```js
const scope = new AlbumsScope()
scope.label(id)
scope.artist(id)
scope.finalQuery
```

#### Overview of available scopes
```js
// Albums
new AlbumsScope.artist(artist_id) 
new AlbumsScope.label(label_id)
new AlbumsScope.labels([label_id, label_id, ...])
new AlbumsScope.filter(string) // Search in album titles

// Artists
new ArtistsScope.filter(string) // Search in artist names

// Tracks
new TracksScope.album(album_id)
new TracksScope.artist(artist_id)
new TracksScope.genre(genre_id)
new TracksScope.filter(string) // Search in track titles
```

## Versioning
This package bases its versioning on the major and minor versions of the [API](https://github.com/accentor/api). This way, changes in routes and scopes are introduced in the same version that they are introduced in the API.
Patch releases can be issued to fix releases in this package itself.
