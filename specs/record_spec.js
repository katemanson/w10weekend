var Record = require("../record");
var assert = require("assert");

describe("Record", function() {

  var recordOne = new Record({
    artist: "Miles Davis", 
    title: "Blue Moods", 
    price: 19.99
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