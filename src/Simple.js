import EntityManager from './simple/engine/ecs/entity/EntityManager';
import EntityMeta from './simple/engine/ecs/entity/EntityMeta';

import ComponentTemplateRegistry from
  './simple/engine/ecs/component/ComponentTemplateRegistry';
import ComponentManager from
  './simple/engine/ecs/component/ComponentManager';

import SystemManager from
  './simple/engine/ecs/system/SystemManager';
import SystemQueue from
  './simple/engine/ecs/system/SystemQueue';
import System from
  './simple/engine/ecs/system/System';

import World from
  './simple/engine/ecs/World';

import LoopFactory from
  './simple/engine/loops/LoopFactory';
import extrapolated_loop from
  './simple/engine/loops/extrapolated-render';

import keycodes from
  './simple/constants/keycodes';
import degreesToRadians from
  './simple/constants/tables/degreesToRadians';

const constants = {
  KEYS: keycodes,
  tables: {
    DEGREES_TO_RADIANS: degreesToRadians
  }
};

export {EntityManager, EntityMeta};
export * from './simple/engine/ecs/entity/fn';

export {ComponentTemplateRegistry, ComponentManager};

export {SystemManager, System, SystemQueue};

export {World};

export {LoopFactory, extrapolated_loop};

export {constants};