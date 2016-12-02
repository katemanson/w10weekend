var RecordStore = function(params) {
  this.name = params.name;
  this.city = params.city;
  this.inventory = [];
  this.bankBalance = 5000;
};

module.exports = RecordStore;