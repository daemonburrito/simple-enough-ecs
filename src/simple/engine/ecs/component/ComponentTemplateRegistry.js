// Registry of template componets.
// This exists partially because we want to be able to load components.
const COMPONENT_NAME_STRING = 'name',
  COMPONENT_NAME_STRING_ERR = `${COMPONENT_NAME_STRING} required.`;

export default class ComponentTemplateRegistry {
  components = {};

  add (component) {
    if (!component.hasOwnProperty(COMPONENT_NAME_STRING)) {
      throw Error(COMPONENT_NAME_STRING_ERR);
    }
    this.components[component.name] = component;
  }
}

export {
  ComponentTemplateRegistry,
  COMPONENT_NAME_STRING
};