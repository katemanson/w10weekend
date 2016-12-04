var Transaction = require("../transaction");
var Record = require("../record");
var RecordStore = require("../record_store");
var RecordCollector = require("../record_collector");
var assert = require("assert");

describe ("Transaction", function() {

  var vinylVillains = new RecordStore({
    name: "Vinyl Villains",
    address: "Edinburgh"
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

  var recordsList = [[recordOne, {quantity: 3}], [recordTwo, {quantity: 2}], [recordThree, {quantity: 1}], [recordFour, {quantity: 1}]];

  var trevor = new RecordCollector({
    name: "Trevor", 
    address: "Leeds",
    budget: 800
  });

  var transaction = new Transaction(vinylVillains, trevor);


  beforeEach(function() {
    vinylVillains.inventory = [];
    vinylVillains.addRecordsFromList(recordsList);
    vinylVillains.bankBalance = 5000;
    trevor.collection = [];
    trevor.budget = 800;
  }); 


  it("should carry out sale transaction (store selling to collector) taking record from store stock and adding to buyer's collection, adjusting money amounts", function() {
    transaction.sellRecord(recordTwo, 1);
    assert.equal(vinylVillains.inventory[1][1].quantity, 1);
    assert.equal(vinylVillains.bankBalance, 5032.9);
    assert.equal(trevor.collection.length, 1);
    assert.equal(trevor.collection[0].artist, "Dave Brubeck");
    assert.equal(trevor.budget, 767.1);
  });

  it("should carry out buy transaction (store buying from collector) taking record from collector's collection and adding to store stock, adjusting money amounts", function() {
    trevor.addRecord(recordFour);
    assert.deepEqual(trevor.collection[0], recordFour);
    transaction.buyRecord({record: recordFour, quantity: 1, buyingPrice: 24.99});
    assert.equal(vinylVillains.inventory[3][1].quantity, 2);
    assert.equal(vinylVillains.bankBalance, 4975.01);
    assert.equal(trevor.collection.length, 0);
    assert.equal(trevor.budget, 824.99);
  });

});