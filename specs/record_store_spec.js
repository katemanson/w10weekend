var RecordStore = require("../record_store");
var assert = require("assert");

describe ("RecordStore", function() {

  var storeOne = new RecordStore({
    name: "Vinyl Villains",
    city: "Edinburgh"
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
    assert.equal();
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