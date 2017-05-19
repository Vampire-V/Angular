var demoApp = angular.module('demo', []);
demoApp.controller('SelectCtrl', function($scope) {
  $scope.blood = {
    fname: ['A', 'B', 'AB', 'O']
  };
  $scope.day = {
    fname: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  };
  $scope.month = {
    fname: ['January', 'February', 'March', 'April', 'May', 'June'
    , 'July', 'August', 'September', 'October', 'November', 'December']
  };
  $scope.years = {
    fname: [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,
      2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]
  };
});
demoApp.controller('MainController', ['$scope', 'todoWebService', function($scope, todoWebService) {

  // Setup a view model
  var vm = {};

  vm.list = [];

  // Start the initial load of lists
  todoWebService.getItems().then(function(response) {
    vm.list = response.data.items;
  });

  vm.addItem = function() {
    var item = {
      newItemFname: vm.newItemFname,
      newItemLname: vm.newItemLname,
      newItemday: vm.newItemday,
      newItemMonth: vm.newItemMonth,
      newItemYear: vm.newItemYear,
      newItemBlood: vm.newItemBlood,
      newItemColer: vm.newItemColer,
      newItemEmail: vm.newItemEmail,
      newItemAddress: vm.newItemAddress,
      newLikeAnime: vm.newLikeAnime,
      newLikeGame: vm.newLikeGame,
      newItemAge: vm.newItemAge,
      newItemSex: vm.newItemSex,
      newIdcard: vm.newIdcard,
      newNumber: vm.newNumber
    };
    // Clear it from the UI
    vm.newItemFname = '';
    vm.newItemLname = '';
    vm.newItemday = '';
    vm.newItemMonth = '';
    vm.newItemYear = '';
    vm.newItemBlood = '';
    vm.newItemColer = '';
    vm.newItemEmail = '';
    vm.newItemAddress = '';
    vm.newLikeAnime = '';
    vm.newLikeGame = '';
    vm.newItemAge = '';
    vm.newItemSex = '';
    vm.newIdcard = '';
    vm.newNumber = '';
    // Send the request to the server and add the item once done
    todoWebService.addItem(item).then(function(response) {
      vm.list.push({
        _id: response.data.itemId,
        newItemFname: item.newItemFname,
        newItemLname: item.newItemLname,
        newItemday: item.newItemday,
        newItemMonth: item.newItemMonth,
        newItemYear: item.newItemYear,
        newItemBlood: item.newItemBlood,
        newItemColer: item.newItemColer,
        newItemEmail: item.newItemEmail,
        newItemAddress: item.newItemAddress,
        newLikeAnime:  item.newLikeAnime,
        newLikeGame:  item.newLikeGame,
        newItemAge: item.newItemAge,
        newItemSex: item.newItemSex,
        newIdcard: item.newIdcard,
        newNumber: item.newNumber
      });
    });
  };

  vm.removeItem = function(itemToRemove) {
    // Remove it from the list and send the server request
    vm.list = vm.list.filter(function(item) {
      return item._id !== itemToRemove._id;
    });
    todoWebService.removeItem(itemToRemove);
  };


  // For new items:
  vm.newItemName = '';
  vm.newItemPlace = '';
  vm.newItemMoney = '';
  vm.newItemKind = '';
  vm.newItemChief = '';
  vm.newItemFaculty = '';
  vm.newCars = '';
  vm.newEmail = '';
  vm.newAddress = '';
  vm.newLikeanime = '';
  vm.newLikegame = '';
  vm.newAge = '';
  vm.newSex = '';
  vm.newIdcard = '';
  vm.newNumber = '';

  // expose the vm using the $scope
  $scope.vm = vm;
}]);


demoApp.service('todoWebService', ['$http', function($http) {
  var root = '/todo';
  return {
    getItems: function() {
      return $http.get(root);
    },

    addItem: function(item) {
      return $http.post(root, item);
    },
    removeItem: function(item) {
      return $http.delete(root + '/' + item._id);
    }

  }
}]);

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
