const MyClass = require('../src/myClass')
const chai = require('chai')
const expect = chai.expect;
const sinon = require('sinon');
const { assert } = require('chai');
const { describe } = require('mocha');
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);
const nock =require('nock')
// creating instance of MyClass
var myObj = new MyClass()


describe("Test suits", function(){
    before(()=>{
        console.log("=========Before the test suit")
    })
    beforeEach(()=>{
        sinon.restore()
        console.log("=========Before each test case")
    })
    after(()=>{
        console.log("=========After the test suit")
    })
    afterEach(()=>{
        console.log("=========After each test case")
    })
    it("Test the add method",()=>{
        expect(myObj.add(1,2)).to.be.equal(3)
    })
    it('spy the add method',()=>{
        // wrapper around add method , keep tack of all the activity happening to add method
        var spy = sinon.spy(myObj, "add")
        myObj.anotherFn(10,20)
        // to check if add function which was assigned to spy variable was been called
        sinon.assert.calledOnce(spy)
        // to check if add was not called twice using both expect and assert
        expect(spy.calledTwice).to.be.false
        assert.notEqual(spy.calledTwice,true)
        //checking the arguments with which it was called
        expect(spy.calledWith(10,20)).to.be.true
        assert.equal(spy.calledWith(10,20),true)
    })

    it('spy the callback ', ()=>{
        const callback = sinon.spy()
        myObj.callback(callback)
        expect(callback.calledOnce).to.be.true
    })
    it('mock the sayHello method', ()=>{
        var mock = sinon.mock(myObj)
        var expectation =mock.expects('sayHello');
        expectation.exactly(1);
        expectation.withArgs("Hello Rilke")
        myObj.anotherFn(10,20)
        mock.verify()
    })
    
})

// describe('Test suit for the stub', () => {
//     beforeEach(()=>{
//         sinon.restore()
//         console.log("=========Before each test case")
//     })
//     it('stub the add method',function(){

//         var stub = sinon.stub(myObj,"add")
//         stub.withArgs().returns(100)
//         expect(myObj).anotherFn(10,20).to.be.equal(100)
//         //expect(myObj).anotherFn(10,20).to.be.notEqual(30)
//     })
    
// })

describe("Test suit for stub", function() {
    beforeEach(()=>{
        sinon.restore()
        console.log("=========Before each test case")
    })
    it("Stub the add method", function() {
      var stub = sinon.stub(myObj,"add");
      stub
        .withArgs(10, 20)
        .onFirstCall()
        .returns(100)
        .onSecondCall()
        .returns(200);
      expect(myObj.anotherFn(10, 20)).to.be.equal(100);
      expect(myObj.anotherFn(10, 20)).to.be.equal(200);
    });
  });

  describe('Test suit for promise',()=>{
    beforeEach(()=>{
        sinon.restore()
        console.log("=========Before each test case")
    })

    it("Promise test case", function(done){

        // To wait as long as promised is not resolved we use this.timeout(0)
        this.timeout(0)
        myObj.testPromise()
            .then((result)=>{
                expect(result).to.be.equal(3)
                done();
            })
    })
  })

describe('Test suit for promise using chai',()=>{

    it("Promise test case using chai-as-promised", function(){

        // To wait as long as promised is not resolved we use this.timeout(0)
        this.timeout(0)
        
        return expect(myObj.testPromise()).to.eventually.equal(3)
        
    })
})

describe('XHR test suit', function(){
    it('Mock and stub xhr call',function(done){
        this.timeout(0)
        // added interceptor to avoid actual API call
        // what data we are expecting from the api calldd
        const scope =nock('https://echo-service-new.herokuapp.com')
            .post("/echo")
            .reply(200, {id:1234})
        myObj.xhrFn().then(function(result){
            expect(result).to.deep.equal({id:1234})
            done();
        })
        .catch((error)=>{
            done(new Error('test case failed'))
        })
    })
})