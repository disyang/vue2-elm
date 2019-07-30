#### JavaScript相关原理实现

- async&await

```javascript
function spawn(genF) {
  const gen = genF();
  return function next(v) {
    return new Promise((resolve, reject) => {
      const next = gen.next(v);
      if (next.done) return resolve(next.value);
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
- 二进制实现加法运算
```javascript
function bitAdd(m, n) {
  while (m) {
    [m, n] = [(m & n) << 1, m ^ n];
  }
  return n;
}
```

- 动态规划 背包问题
```javascript
function dKnapsack(capacity, size, value){
  if(size.length !== value.length) throw new Error('size length not equal value length');
  let len = size.length;
  const dp = Array(capacity + 1).fill(0).map(() => []);
  for(let i = 0; i<= len; i++){
    for(let w = 0; w <= capacity; w++){
      if(i == 0 || w == 0) {
        dp[i][w] = 0;
      } else if (size[i - 1] <= w) {
        dp[i][w] = Math.max(value[i - 1] + dp[i - 1][w - size[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }
  return dp[len][capacity];
}
```
