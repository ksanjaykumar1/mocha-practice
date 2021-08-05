const MyClass = require('../src/myClass')
const chai = require('chai')
const expect = chai.expect;
// creating instance of MyClass
var myObj = new MyClass()


describe("Test suits", function(){
    it("Test the add method",()=>{
        expect(myObj.add(1,2)).to.be.equal(3)
    })
})