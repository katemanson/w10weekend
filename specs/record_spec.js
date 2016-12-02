var Record = require("../record");
var assert = require("assert");

describe("Record", function() {

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

  it("should have an artist name", function() {
    assert.equal(recordOne.artist, "Miles Davis");
  });

  it("should have a title", function() {
    assert.equal(recordOne.title, "Blue Moods");
  });

  it("should have a price", function() {
    assert.equal(recordOne.price, 19.99);
  });

});