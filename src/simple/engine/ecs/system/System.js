export default class System {
  // This method is called by the manager in the game loop(s).
  update(entity, components) {
    console.log('noop',
      entity,
      components);
  }
}
