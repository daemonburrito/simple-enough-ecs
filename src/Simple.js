import "babel-polyfill";

import EntityManager from './simple/engine/ecs/entity/EntityManager';
import EntityMeta from './simple/engine/ecs/entity/EntityMeta';

import ComponentTemplateRegistry from
  './simple/engine/ecs/component/ComponentTemplateRegistry';
import ComponentManager from
  './simple/engine/ecs/component/ComponentManager';

import SystemManager from
  './simple/engine/ecs/system/SystemManager';
import System from
  './simple/engine/ecs/system/System';

import World from
  './simple/engine/ecs/World';

import extrapolated_loop from
  './simple/engine/loops/extrapolated_render';

export {EntityManager, EntityMeta};
export * from './simple/engine/ecs/entity/fn';

export {ComponentTemplateRegistry, ComponentManager};

export {SystemManager, System};

export {World};

export {extrapolated_loop};