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

  var recordsList = [[recordOne, {quantity: 3}], [recordTwo, {quantity: 2}], [recordThree, {quantity: 1}], [recordFour, {quantity: 1}]];


  beforeEach(function() {
    storeOne.inventory = [];
    storeOne.bankBalance = 5000;
    // ?recordsList below used in tests for sale method; quantity changes between tests unless reset by including here, in beforeEach; not sure why??
    recordsList = [[recordOne, {quantity: 3}], [recordTwo, {quantity: 2}], [recordThree, {quantity: 1}], [recordFour, {quantity: 1}]];
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

  it("should be possible to add a record to inventory; no pre-existing entry for the same record", function() {
    storeOne.addRecord(recordOne, 3);
    assert.deepEqual(recordOne, storeOne.inventory[0][0]);
    assert.equal(3, storeOne.inventory[0][1].quantity);
  }); 

  it("should be possible to add a record to inventory; entry for the same record already exists", function() {
    storeOne.addRecord(recordOne, 3);
    storeOne.addRecord(recordOne, 2);
    assert.equal(5, storeOne.inventory[0][1].quantity);
  });

  it("should be possible to add a record to inventory; assume quantity = 1 when no quantity argument given", function() {
    storeOne.addRecord(recordOne);
    assert.equal(1, storeOne.inventory[0][1].quantity);
  });

  it("should be possible to add multiple records to inventory", function() {
    storeOne.addRecordsFromList(recordsList);
    assert.equal(4, storeOne.inventory.length);
    assert.deepEqual(recordOne, storeOne.inventory[0][0]);
    assert.deepEqual(recordFour, storeOne.inventory[3][0]);
  }); 

  it("should be possible to list the inventory; printout-style", function() {
    storeOne.addRecordsFromList(recordsList);
    var expected = "--------------------------------------\n Vinyl Villains, Edinburgh: Inventory\n--------------------------------------\n\nArtist: Miles Davis\nTitle: Blue Moods\nPrice: £19.99\nQuantity: 3\n\nArtist: Dave Brubeck\nTitle: Take Five\nPrice: £32.9\nQuantity: 2\n\nArtist: Sonny Rollins\nTitle: Now's the Time\nPrice: £30\nQuantity: 1\n\nArtist: Nina Simone\nTitle: Silk & Soul\nPrice: £28.17\nQuantity: 1";
    assert.equal(storeOne.listInventory(), expected);
  }); 

  it("should be possible to list the inventory; JSON", function() {
    storeOne.addRecordsFromList(recordsList);
    var expected = '[[{"artist":"Miles Davis","title":"Blue Moods","price":19.99},{"quantity":3}],[{"artist":"Dave Brubeck","title":"Take Five","price":32.9},{"quantity":2}],[{"artist":"Sonny Rollins","title":"Now\'s the Time","price":30},{"quantity":1}],[{"artist":"Nina Simone","title":"Silk & Soul","price":28.17},{"quantity":1}]]';
    assert.equal(storeOne.listInventoryJSON(), expected);
  }); 

  it("should change stock levels on selling a record", function() {
    storeOne.addRecordsFromList(recordsList);
    storeOne.sale(recordOne, 2);
    assert.equal(storeOne.inventory[0][1].quantity, 1);
  }); 

  it("should change stock levels on selling a record; assume quantity = 1 when no quantity argument given", function() {
    storeOne.addRecordsFromList(recordsList);
    storeOne.sale(recordOne);
    assert.equal(storeOne.inventory[0][1].quantity, 2);
  }); 

  it("should delete record when all copies are sold", function() {
    storeOne.addRecordsFromList(recordsList);
    storeOne.sale(recordOne, 3);
    assert.equal(storeOne.inventory.length, 3);
    assert.equal(storeOne.inventory[0][0].artist, "Dave Brubeck");
  });

  it("should return an appropriate message if there isn't enough stock; too few copies", function() {
    storeOne.addRecord(recordOne, 2);
    assert.equal(storeOne.sale(recordOne, 3), "Only 2 in stock");
  });

  it("should return an appropriate message if there isn't enough stock; out of stock", function() {
    storeOne.addRecord(recordOne, 2);
    assert.equal(storeOne.sale(recordTwo, 3), "Out of stock");
  });

  it("should increase bank balance on selling a record", function() {
    storeOne.addRecordsFromList(recordsList);
    storeOne.sale(recordOne, 3);
    assert.equal(storeOne.bankBalance, 5059.97);
  }); 

  it("should be possible to find value of inventory", function() {
    storeOne.addRecordsFromList(recordsList);
    assert.equal(storeOne.valueInventory(), 183.94);
  }); 

  it("should be possible to report on store finances; printout-style", function() {
    storeOne.addRecordsFromList(recordsList);
    var expected = "--------------------------------------\n Vinyl Villains, Edinburgh: Finances\n--------------------------------------\nValue of inventory: £183.94\nCash: £5000\nTotal: £5183.94";
    assert.equal(storeOne.financeReport(), expected);
  }); 

  it("should be possible to report on store finances; JSON", function() {
    storeOne.addRecordsFromList(recordsList);
    var expected = '{"valueOfInventory":183.94,"cash":5000,"total":5183.94}';
    assert.equal(storeOne.financeReportJSON(), expected);
  }); 

});