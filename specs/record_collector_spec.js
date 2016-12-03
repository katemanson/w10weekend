var RecordCollector = require("../record_collector");
var Record = require("../record");
var assert = require("assert");

describe("RecordCollector", function() {

  var trevor = new RecordCollector({
    name: "Trevor", 
    address: "Leeds",
    budget: 800
  });

  var recordOne = new Record({
    artist: "Miles Davis", 
    title: "Blue Moods", 
    cost: 19.99
  });


  beforeEach(function() {
    trevor.collection = [];
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

  it("should be possible to add a record to the collection", function() {
    trevor.addRecord(recordOne);
    assert.equal(trevor.collection.length, 1);
    assert.equal(trevor.collection[0].artist, "Miles Davis");
  });

  it("should be possible to buy a record, adding to collection and reducing available budget", function() {
    trevor.buyRecord(recordOne);
    assert.equal(trevor.collection.length, 1);
    assert.equal(trevor.budget, 780.01);
  });

  it("should")

});