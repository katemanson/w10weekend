var RecordStore = function(params) {
  this.name = params.name;
  this.city = params.city;
  this.inventory = [];
  this.bankBalance = 5000;
};

RecordStore.prototype = {
  
  addRecord: function(record) {
    this.inventory.push(record);
  },

  addRecordMultiple: function(record, number) {
    for ( var i = 0; i < number; i++ ) {
      this.inventory.push(record);
    }
  }
};

module.exports = RecordStore;