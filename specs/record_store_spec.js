var RecordStore = require("../record_store");
var Record = require("../record");
var assert = require("assert");

describe ("RecordStore", function() {

  var storeOne = new RecordStore({
    name: "Vinyl Villains",
    city: "Edinburgh"
  });

  var recordOne = new Record({
    artist: "Miles Davis", 
    title: "Blue Moods", 
    price: 19.99
  });
  
  var recordTwo = new Record({
    artist: "Dave Brubeck",
    title: "Take Five",
    price: 32.90
  });

  var recordThree = new Record({
    artist: "Sonny Rollins",
    title: "Now's the Time",
    price: 30.00
  });

  var recordFour = new Record({
    artist: "Nina Simone",
    title: "Silk & Soul",
    price: 28.17
  });


  beforeEach(function() {
    storeOne.inventory = [];
  });


  it("should have a name", function() {
    assert.equal(storeOne.name, "Vinyl Villains");
  });

  it("should have a city", function() {
    assert.equal(storeOne.city, "Edinburgh");
  });

  it("should have an inventory that starts empty", function() {
    assert.equal(0, storeOne.inventory.length);
  }); 

  it("should have a starting bank balance of 5000", function() {
    assert.equal(5000, storeOne.bankBalance);
  }); 

  it("should be possible to add a record to inventory", function() {
    storeOne.addRecord(recordOne);
    assert.deepEqual(recordOne, storeOne.inventory[0]);
  }); 

  it("should be possible to add multiples of a record to inventory", function() {
    storeOne.addRecordMultiple(recordOne, 5);
    assert.equal(5, storeOne.inventory.length);
    assert.deepEqual(recordOne, storeOne.inventory[4]);
  }); 

  it("should be possible to add multiple records to inventory", function() {
    assert.equal();
  }); 

  it("should be possible to list inventory", function() {
    assert.equal();
  }); 

  // it("should be possible to sell a record", function() {
  //   assert.equal();
  // }); 

  // it("should increase bank balance on selling a record", function() {
  //   assert.equal();
  // }); 

  // it("should be possible to report on store finances", function() {
  //   assert.equal();
  // }); 

});