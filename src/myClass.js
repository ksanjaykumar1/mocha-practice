class MyClass{
    constructor(){
        console.log("initiated")
    }

    add (arg1, arg2){
        return arg1+arg2
    }
    anotherFn(arg1,arg2){
        return this.add(arg1,arg2)
    }
}

module.exports = MyClass;