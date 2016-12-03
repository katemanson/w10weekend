var RecordStore = function(params) {
  this.name = params.name;
  this.city = params.city;
  this.inventory = [];
  this.bankBalance = 5000;
};

RecordStore.prototype = {

  addRecord: function(record, quantity) {

    var index = this.inventory.findIndex(function(item) {
      return (item[0].artist === record.artist && item[0].title === record.title);
    });

    if ( index >= 0 ) {
      this.inventory[index][1].quantity += quantity;
    }
    else if ( quantity === undefined ) {
      this.inventory.push([record, {quantity: 1}]);
    }
    else {
      this.inventory.push([record, {quantity: quantity}]);
    };
  },

  addRecordsFromList: function(recordsList) {
    this.inventory = this.inventory.concat(recordsList);
  }, 

  listInventory: function() {

    var listIntro = "--------------------------------------\n " + this.name + ", " + this.city + ": Inventory\n--------------------------------------";
    var listingText = "";

    var listings = this.inventory.map( function(listing) {
      return listingText = "\n\nArtist: " + listing[0].artist + "\nTitle: " + listing[0].title + "\nPrice: £" + listing[0].price + "\nQuantity: " + listing[1].quantity;
    });

    var finalList = listings.reduce( function(list, listing) {
      return list.concat(listing);
    }, listIntro);    

    return finalList;
  }, 

  listInventoryJSON: function() {
    return JSON.stringify(this.inventory);
  },

  sale: function(record, quantity) {

    // .findIndex() returns -1 if none found
    var index = this.inventory.findIndex(function(item) {
      return ( item[0].artist === record.artist && item[0].title === record.title && item[1].quantity > 0 );
    });

    if ( index >= 0 && quantity <= this.inventory[index][1].quantity ) {
      this.inventory[index][1].quantity -= quantity;
      this.bankBalance += this.inventory[index][0].price * quantity;
    }
    else if ( index >= 0 && quantity === undefined && this.inventory[index][1].quantity >= 1 ) {
      this.inventory[index][1].quantity--;
      this.bankBalance += this.inventory[index][0].price;
    }
    else {
      if ( index === -1 ) {
        return "Out of stock";
      }
      if ( this.inventory[index][1].quantity < quantity ) {
        return "Only " + this.inventory[index][1].quantity + " in stock";
      }
    };

    if ( this.inventory[index][1].quantity <= 0 ) {
      this.inventory.splice(index, 1);
    };
  }, 

  valueInventory: function() {

    var values = this.inventory.map( function(listing) {
      return listing[0].price * listing[1].quantity;
    });

    var totalValue = values.reduce(function(accumulator, value) {
      return accumulator += value;      
    });

    return totalValue;

  }

};

module.exports = RecordStore;