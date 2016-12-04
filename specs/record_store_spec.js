var RecordStore = require("../record_store");
var Record = require("../record");
var assert = require("assert");

describe ("RecordStore", function() {

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


  beforeEach(function() {
    vinylVillains.inventory = [];
    vinylVillains.bankBalance = 5000;
    // ?recordsList below used in tests for sale method, entered new each time; quantity changes between tests unless reset by including here, in beforeEach; not sure why??
    recordsList = [[recordOne, {quantity: 3}], [recordTwo, {quantity: 2}], [recordThree, {quantity: 1}], [recordFour, {quantity: 1}]];
  });


  it("should have a name", function() {
    assert.equal(vinylVillains.name, "Vinyl Villains");
  });

  it("should have an address", function() {
    assert.equal(vinylVillains.address, "Edinburgh");
  });

  it("should have an inventory that starts empty", function() {
    assert.equal(0, vinylVillains.inventory.length);
  }); 

  it("should have a starting bank balance of 5000", function() {
    assert.equal(5000, vinylVillains.bankBalance);
  }); 

  it("should be possible to add a record to inventory; no pre-existing entry for the same record", function() {
    vinylVillains.addRecord(recordOne, 3);
    assert.deepEqual(recordOne, vinylVillains.inventory[0][0]);
    assert.equal(3, vinylVillains.inventory[0][1].quantity);
  }); 

  it("should be possible to add a record to inventory; entry for the same record already exists", function() {
    vinylVillains.addRecord(recordOne, 3);
    vinylVillains.addRecord(recordOne, 2);
    assert.equal(5, vinylVillains.inventory[0][1].quantity);
  });

  it("should be possible to add a record to inventory; assume quantity = 1 when no quantity argument given", function() {
    vinylVillains.addRecord(recordOne);
    assert.equal(1, vinylVillains.inventory[0][1].quantity);
  });

  it("should be possible to add multiple records to inventory", function() {
    vinylVillains.addRecordsFromList(recordsList);
    assert.equal(4, vinylVillains.inventory.length);
    assert.deepEqual(recordOne, vinylVillains.inventory[0][0]);
    assert.deepEqual(recordFour, vinylVillains.inventory[3][0]);
  }); 

  it("should be possible to list the inventory; printout-style", function() {
    vinylVillains.addRecordsFromList(recordsList);
    var expected = "--------------------------------------\n Vinyl Villains, Edinburgh: Inventory\n--------------------------------------\n\nArtist: Miles Davis\nTitle: Blue Moods\nPrice: £19.99\nQuantity: 3\n\nArtist: Dave Brubeck\nTitle: Take Five\nPrice: £32.9\nQuantity: 2\n\nArtist: Sonny Rollins\nTitle: Now's the Time\nPrice: £30\nQuantity: 1\n\nArtist: Nina Simone\nTitle: Silk & Soul\nPrice: £28.17\nQuantity: 1";
    assert.equal(vinylVillains.listInventory(), expected);
  }); 

  it("should be possible to list the inventory; JSON", function() {
    vinylVillains.addRecordsFromList(recordsList);
    var expected = '[[{"artist":"Miles Davis","title":"Blue Moods","price":19.99},{"quantity":3}],[{"artist":"Dave Brubeck","title":"Take Five","price":32.9},{"quantity":2}],[{"artist":"Sonny Rollins","title":"Now\'s the Time","price":30},{"quantity":1}],[{"artist":"Nina Simone","title":"Silk & Soul","price":28.17},{"quantity":1}]]';
    assert.equal(vinylVillains.listInventoryJSON(), expected);
  }); 

  it("should change stock levels on selling a record", function() {
    vinylVillains.addRecordsFromList(recordsList);
    vinylVillains.sale(recordOne, 2);
    assert.equal(vinylVillains.inventory[0][1].quantity, 1);
  }); 

  it("should change stock levels on selling a record; assume quantity = 1 when no quantity argument given", function() {
    vinylVillains.addRecordsFromList(recordsList);
    vinylVillains.sale(recordOne);
    assert.equal(vinylVillains.inventory[0][1].quantity, 2);
  }); 

  it("should delete record when all copies are sold", function() {
    vinylVillains.addRecordsFromList(recordsList);
    vinylVillains.sale(recordOne, 3);
    assert.equal(vinylVillains.inventory.length, 3);
    assert.equal(vinylVillains.inventory[0][0].artist, "Dave Brubeck");
  });

  it("should return an appropriate message if there isn't enough stock; too few copies", function() {
    vinylVillains.addRecord(recordOne, 2);
    assert.equal(vinylVillains.sale(recordOne, 3), "Only 2 in stock");
  });

  it("should return an appropriate message if there isn't enough stock; out of stock", function() {
    vinylVillains.addRecord(recordOne, 2);
    assert.equal(vinylVillains.sale(recordTwo, 3), "Out of stock");
  });

  it("should increase bank balance on selling a record", function() {
    vinylVillains.addRecordsFromList(recordsList);
    vinylVillains.sale(recordOne, 3);
    assert.equal(vinylVillains.bankBalance, 5059.97);
  }); 

  it("should change stock levels on buying a record", function() {
    assert.equal(vinylVillains.inventory.length, 0);
    vinylVillains.buyRecord({record: recordOne, quantity: 1, buyingPrice: 10});
    assert.equal(vinylVillains.inventory.length, 1);
  });

  it("should change stock levels on buying a record; assume quantity = 1 when no quantity argument given", function() {
    assert.equal(vinylVillains.inventory.length, 0);
    vinylVillains.buyRecord({record: recordOne, buyingPrice: 10});
    assert.equal(vinylVillains.inventory[0][1].quantity, 1);
  }); 

  it("should change bank balance on buying a record", function() {
    assert.equal(vinylVillains.inventory.length, 0);
    vinylVillains.buyRecord({record: recordOne, quantity: 1, buyingPrice: 10});
    assert.equal(vinylVillains.bankBalance, 4990);
  });

  it("should be possible to find value of inventory (at selling prices)", function() {
    vinylVillains.addRecordsFromList(recordsList);
    assert.equal(vinylVillains.valueInventory(), 183.94);
  }); 

  it("should be possible to report on store finances; printout-style", function() {
    vinylVillains.addRecordsFromList(recordsList);
    var expected = "--------------------------------------\n Vinyl Villains, Edinburgh: Finances\n--------------------------------------\nValue of inventory at selling prices: £183.94\nCash: £5000\nTotal: £5183.94";
    assert.equal(vinylVillains.financeReport(), expected);
  }); 

  it("should be possible to report on store finances; JSON", function() {
    vinylVillains.addRecordsFromList(recordsList);
    var expected = '{"valueOfInventory":183.94,"cash":5000,"total":5183.94}';
    assert.equal(vinylVillains.financeReportJSON(), expected);
  }); 

});