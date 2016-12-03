var RecordCollector = require("../record_collector");
var assert = require("assert");

describe("RecordCollector", function() {

  var trevor = new RecordCollector({
    name: "Trevor", 
    address: "Leeds",
    budget: 800
  });

  it("should have a name", function() {
    assert.equal(trevor.name, "Trevor");
  });

  it("should have an address", function() {
    assert.equal(trevor.address, "Leeds");
  });

  it("should have a budget", function() {
    assert.equal(trevor.budget, 800);
  });

  it("should have a record collection that starts empty", function() {
    assert.equal(trevor.collection.length, 0);
  });

});