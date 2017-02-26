//import * as simple from 'simple';
//require('simple');
import {
  entity
} from 'simple/engine/ecs';

const entities = entity.create_entity_stack(50);

const entity_manager = new entity.EntityManager(entities);

debugger