import { getParamNames } from './function-params.js';

class Container {
  modules = {};

  constructor(injectable) {
    this.injectable = injectable;
  }

  add(name, Module) {
    const paramNames = getParamNames(Module);
    const parameters = paramNames.map((item) => this.injectable[item]);

    const module = Module(...parameters);
    this.modules[name] = module;
    return module;
  }

  get(name) {
    return this.modules[name];
  }
}

export { Container };
