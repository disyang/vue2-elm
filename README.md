#### JavaScript相关原理实现

1. async&await

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
