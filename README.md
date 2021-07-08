# Accentor API Client

## How to use

To intialize the API client:
```js
import createApiClient from "api-client-js";

const baseURL = /* Your logic for baseURL, including /api/ */

const api = createApiClient(baseURL);
```

### Overview of functions
All functions should be provided with an auth object containing the `device_id` and `secret`. In case an auth token isn't necessary (ie. when creating an auth token), you can simply pass an empty object.

Not every function is available for every model. Refer to the API controllers to see the options.
```js
// Index
const generator = api.tracks.indexGenerator(auth);
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
 