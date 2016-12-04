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

  var recordsList = [recordOne, recordTwo, recordThree, recordFour];


  beforeEach(function() {
    trevor.collection = [];
    trevor.budget = 800;
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

  it("should be possible to remove a record from the collection", function() {
    trevor.addRecord(recordOne);
    trevor.addRecord(recordTwo);
    trevor.addRecord(recordThree);
    assert.equal(trevor.collection.length, 3);
    trevor.removeRecord(recordTwo);
    assert.equal(trevor.collection.length, 2);
  });

  it("should be possible to sell a record, removing from collection and increasing available budget", function() {
    trevor.addRecord(recordOne);
    trevor.addRecord(recordTwo);
    trevor.addRecord(recordThree);
    trevor.addRecord(recordFour);
    assert.equal(trevor.collection.length, 4);
    trevor.sellRecord(recordThree, 22.70);
    assert.equal(trevor.collection.length, 3);
    assert.equal(trevor.budget, 822.70);
  });

  it("should be possible to sell a record, removing from collection; if all sold, leaves empty collection", function() {
    trevor.addRecord(recordOne);
    assert.equal(trevor.collection.length, 1);
    trevor.sellRecord(recordOne, 22.70);
    assert.equal(trevor.collection.length, 0);
    assert.equal(trevor.budget, 822.70);
  });

});