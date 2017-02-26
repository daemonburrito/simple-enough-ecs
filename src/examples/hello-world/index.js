import {
  simple
} from 'simple';

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
console.log(simple);

const entities = simple.ecs.entity.create_entity_stack(50),
  /*eslint no-unused-vars: 0 */
  entityManager = new simple.ecs.entity.EntityManager(entities);

/*eslint no-debugger: 0*/
debugger