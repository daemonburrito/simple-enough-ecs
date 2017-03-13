# API Documentation

Note: Pre-alpha, subject to breaking changes.

## Entity

### EntityManager

`const manager = new Simple.EntityManager([entities])`

Orchestrator of operations for Entities.

* `entities` (optional) Pre-allocated structure for stack of entity IDs. If omitted, one is created by default.

#### World Integration

To use with the `World` interface:

```javascript
const world = new Simple.World();
world.EntityManager = new Simple.EntityManager();

// This interface is then available as `world.entities`
const entity = world.entities.create();
```

#### EntityManager.create()

`const entity = manager.create()`

Get the next available entity ID.

#### EntityManager.register(id, componentsKey)

`manager.register(entity, componentsKey)`

Associate an `entity` (ID) with a `componentsKey`.

In context with `Component`:
```javascript
let componentsKey = world.components.createComponentsKey(
  'name',
  'position'
  ),
  entity = world.entities.create();

world.entities.register(entity, componentsKey);
```

####  EntityManager.attachComponents(id, ...components)

`manager.attachComponents(id, ...components)`

Attach any number of components to an `entity` (ID).

* `id` Entity ID
* `...components` Objects representing component data.

#### EntityManager.query(componentsKey)

`let ids = manager.query(componentsKey)`

Retrieve an array of Entity IDs associated with a `componentsKey`.

## Component

### ComponentManager

`const manager = new Simple.ComponentManager()`

Orchestrator of operations for Components.

#### World Integration

To use with the `World` interface:

```javascript
const world = new Simple.World();
world.ComponentManager = new Simple.ComponentManager();

// This interface is then available as `world.components`
world.components.createComponentsKey("name", "position");
```

#### createComponentsKey(...components)

`let key = manager.createComponentsKey("name", "position");`

Create a key by providing the names of components.

In context:

```javascript
const world = new Simple.World();
world.ComponentManager = new Simple.ComponentManager();
world.EntityManager = new Simple.EntityManager();
world.SystemManager = new Simple.SystemManager();

let componentsKey = world.components.createComponentsKey([
  'name', 'position', 'direction', 'velocity'
]);

let player = world.entities.create();

world.entities.register(player, componentsKey);
```

## System

### SystemManager

`const manager = new Simple.SystemManager()`

Orchestrator of operations for Systems.

#### World Integration

To use with the `World` interface:

```javascript
const world = new Simple.World();
world.SystemManager = new Simple.SystemManager();

// ...setup

// This interface is then available as `world.systems`
world.systems.register_queue(queue, componentsKey);
```

#### register_queue(queue, componentsKey)

`world.systems.register_queue(queue, componentsKey)`

Register a queue of Systems, grouped by component key, with the manager. This key determines which entities the systems will receive.

* `queue` An Iterable of `System` objects implementing `update(entity, components)`.
* `componentsKey` Key generated with `components.createComponentsKey(...components)`.

#### query(componentsKey)

`world.systems.query(componentsKey)`

Returns the `SystemQueue` associated with `componentsKey`.

* `componentsKey` Key generated with `components.createComponentsKey(...components)`.

#### runQueue(componentsKey, entity, components)

`world.systems.runQueue(componentsKey, entity, components)`

Run all systems in a queue, passing them `entity, components`. This is called by `World` when used with world integration (and so not usually called directly).

### SystemQueue

`let queue = new SystemQueue([system1, system2])`

A queue of `System` objects implementing `update(entity, components)`.

Optionally, Systems can be run in a specified order. Set `queue.sort` to `true`, and set a `priority` attribute on each System.

* `queue` An iterable of `System` objects.

### System

`class NewSystem extends Simple.System {}`

It's not required to inherit from this class to create instances, just potentially convenient. The only requirement for Systems is that they implement an interface containing `update(entity, components)`.

Example usage:
```javascript
class MovementSystem extends Simple.System {
  update(entity, components) {
    let dirRads = components[0].direction * Math.PI/180;

    let velX = Math.sin(dirRads) * components[0].speed;
    let velY = Math.cos(dirRads) * components[0].speed;

    components[0].position[0] += velX;
    components[0].position[1] += velY;
  }
}

// Set up some entities and components
const world = new Simple.World();
world.ComponentManager = new Simple.ComponentManager();
world.EntityManager = new Simple.EntityManager();
world.SystemManager = new Simple.SystemManager();

let componentKey = world.components.createComponentsKey([
  'name', 'position', 'direction', 'speed'
]);

let mob = world.entities.create();

world.entities.register(mob, componentKey);

world.entities.attachComponents(mob, {
  name: 'mob',
  position: [10,10],
  direction: 270,
  speed: 1
});

// Register the name system with the SystemManager.
let moveSystem = new MovementSystem(),
  queue = new Simple.SystemQueue([moveSystem]);

// Register a new system queue
world.systems.register_queue(queue, componentKey);
```

On each tick, all entities with a matching `componentsKey` with be passed to the `movementSystem` and have their Component instance data evaluated and updated.

## World

todo...

## Loops