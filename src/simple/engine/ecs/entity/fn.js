// Generation and management of entity IDs

// entities are stored in a contiguous array of unsigned 32-bit integers
const create_entity_stack = (len) => {
  return new Uint32Array(len);
};


export {
  create_entity_stack
}