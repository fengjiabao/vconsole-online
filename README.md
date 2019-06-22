## Online and offline debugging tools based on vconsole

1. Development environment always opens vconsole.

2. The online environment automatically hides vconsole and pulls vconsole through gesture rules.

3. Pull up rules can be matched.

   ### usage

   ```
   import Debugger from 'vconsoleonline'
   
   /**
    * @param1 {String} Development environment domain name
    * @param2 {Array} Pull up vconsole configurable rules
    */
   Debugger('dev.dk-app.com', ['up', 'down', 'left', 'right','right', 'click','click'])
   
   ```

   #### GitHub 

   ```
   https://github.com/fengjiabao/vconsole-online.git
   ```

   

#### 