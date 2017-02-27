import Manager from 'simple/engine/ecs/entity/EntityManager';
import {
  create_entity_stack
} from 'simple/engine/ecs/entity/fn'

/*eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */
console.log(Manager);

const entities = create_entity_stack(50),
  /*eslint no-unused-vars: 0 */
  entityManager = new Manager(entities);

/*eslint no-debugger: 0*/
debugger