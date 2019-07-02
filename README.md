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

- new原理实现

  ```
  function myNew(fn, ...rest) {
    const obj = {};
    obj.setPrototypeOf(fn.prototype);
    const fnObj = fn.apply(obj, rest);
    return typeof fnObj === 'object' ? fnObj : obj;
  }
  ```

  ```
  function myNew(fn, ...rest) {
    const obj = Object.create(fn.prototype)
    const fnObj = fn.apply(obj, rest);
    return typeof fnObj === 'object' ? fnObj : obj;
  }
  ```

  ```
  function myNew(fn, ...rest) {
    const obj = {};
    obj.__proto__ = fn.prototype;
    const fnObj = fn.apply(obj, rest);
    return typeof fnObj === 'object' ? fnObj : obj;
  }
  ```
