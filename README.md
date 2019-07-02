#### JavaScript相关原理实现

- async&await

  ```javascript
  function spawn(genF) {
    const gen = genF();
    return function next(v){
      return new Promise((resolve, reject) => {
        const next = gen.next(v);
        if(next.done) return resolve(next.value);
        return Promise.resolve(next.value).then(next).then(resolve, reject);
      })
    }
  }
  ```

  ```javascript
  function spawn(genF) {
    return new Promise(function (resolve, reject) {
      const gen = genF();
  
      function step(nextF) {
        let next;
        try {
          next = nextF();
        } catch (e) {
          return reject(e);
        }
        if (next.done) {
          return resolve(next.value);
        }
        Promise.resolve(next.value).then(function (v) {
          step(function () {
            return gen.next(v);
          });
        }, function (e) {
          step(function () {
            return gen.throw(e);
          });
        });
      }
      step(function () {
        return gen.next(undefined);
      });
    });
  }
  ```

  

- new原理实现

  ```javascript
  function myNew(fn, ...rest) {
    const obj = {};
    obj.setPrototypeOf(fn.prototype);
    const fnObj = fn.apply(obj, rest);
    return typeof fnObj === 'object' ? fnObj : obj;
  }
  ```

  ```javascript
  function myNew(fn, ...rest) {
    const obj = Object.create(fn.prototype)
    const fnObj = fn.apply(obj, rest);
    return typeof fnObj === 'object' ? fnObj : obj;
  }
  ```

  ```javascript
  function myNew(fn, ...rest) {
    const obj = {};
    obj.__proto__ = fn.prototype;
    const fnObj = fn.apply(obj, rest);
    return typeof fnObj === 'object' ? fnObj : obj;
  }
  ```

  
