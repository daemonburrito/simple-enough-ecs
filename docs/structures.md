# Data structures

## ComponentsKey

The main pattern is a dynamic JS version of the "bitmask" pattern in C/C++, where unique keys are made from the bundle of concerned components. This makes one "key", the other is the traditional Entity ID.

### Map 1: ComponentsKey->IDs

Map 1 is the relationship between generated `ComponentKey`s (created from the keys of component dictionaries in this design), and Entity IDs:

```
[ComponentsKey1]: [0,1,2,3,4,...],
[ComponentsKey2]: [3,4,5,...],
...
```

Map 2 is the relationship between an EntityID and its components:

```
[0]: {
  component1: value1,
  component2: value2,
  ...
}
```


## Queue keys

### `Set` from `Object.keys()`

If components are simple key/value pairs in an object literal, then keys for system queues could be made from sets:

```javascript
let components = {
  name: 'foo',
  position: [0,0,0],
  direction: 90,
  speed: 1.5
};

let key = new Set(components.keys());
```
