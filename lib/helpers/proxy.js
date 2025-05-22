export function createProxy(source, target) {
  for (const key in target) {
    if (typeof target[key] === "function") {
      createMethodProxy(source, target, key);
    } else {
      createPropertyProxy(source, target, key);
    }
  }
}

function createPropertyProxy(source, target, propertyName) {
  Reflect.defineProperty(source, propertyName, {
    configurable: true,
    enumerable: true,
    get: () => {
      return target[propertyName];
    },
    set: (value) => {
      target[propertyName] = value;
    },
  });
}

function createMethodProxy(source, target, methodName) {
  Reflect.defineProperty(source, methodName, {
    configurable: true,
    enumerable: true,
    value: target[methodName].bind(target),
  });
}
