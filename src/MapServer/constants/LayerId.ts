/**
 * A utility object to collect globally unique Layer IDs through declaration merging.
 */

/**
 * Interface used for declaration merging to consolidate the Layer IDs.
 */
export interface LayerId {
  // LayerId: T; where T is a unqiue type such that duplicated LayerIds will be caught at compile time.
};

type LayerIdString = Record<keyof LayerId, string>;

// Creates a Proxy to return values similar to property name.
// Since properties of an object are unique, property values will be unique as well.
const proxy = new Proxy({
} as LayerIdString,{
  get(obj, prop) {
    return prop;
  }
});

export default proxy;