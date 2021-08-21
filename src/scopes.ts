export class Scope {
  scopes: { key: string; query: string | number }[] = [];

  get finalQuery(): string {
    return this.scopes.map((s) => `&${s.key}=${s.query}`).join("");
  }

  addScope(key: string, query: number | string): this {
    this.scopes.push({ key, query });
    return this;
  }

  addScopesFromArray(key: string, queries: number[] | string[]): this {
    queries.forEach((q) => this.addScope(key, q));
    return this;
  }
}

export class AlbumsScope extends Scope {
  artist(id: number | string): this {
    return this.addScope("artist_id", id);
  }

  filter(string: string): this {
    return this.addScope("filter", string);
  }

  label(id: number | string): this {
    return this.addScope("label", id);
  }

  labels(ids: number[] | string[]): this {
    return this.addScopesFromArray("labels", ids);
  }
}

export class ArtistsScope extends Scope {
  filter(string: string): this {
    return this.addScope("filter", string);
  }
}

export class PlaysScope extends Scope {
  album(id: number | string): this {
    return this.addScope("album_id", id);
  }
}

export class TracksScope extends Scope {
  album(id: number | string): this {
    return this.addScope("album_id", id);
  }

  artist(id: number | string): this {
    return this.addScope("artist_id", id);
  }

  filter(string: string): this {
    return this.addScope("filter", string);
  }

  genre(id: number | string): this {
    return this.addScope("genre_id", id);
  }
}
