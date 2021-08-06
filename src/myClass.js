var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class MyClass{
    constructor(){
        console.log("initiated")
    }
    sayHello(str){
        console.log(str)
    }

    add (arg1, arg2){
        return arg1+arg2
    }
    anotherFn(arg1,arg2){
        this.sayHello("Hello Rilke");
        return this.add(arg1,arg2)
    }
    callback(callbackfunction){
        // console.log(callbackfunction)
        callbackfunction()
    }

    testPromise(){
        return new Promise(function(resolve,reject){
            setTimeout(() => resolve(3), 3000);
        })
        
    }
    xhrFn() {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("post", "https://echo-service-new.herokuapp.com/echo", true);
    
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject(xhr.status);
              }
            }
          };
          xhr.send();
        })
          .then(function(result) {
            return result;
          })
          .catch(error => {
            return error;
          });
      }
}


module.exports = MyClass;