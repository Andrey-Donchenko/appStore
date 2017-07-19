(function() {
    
    'use strict';

    angular
        .module('app')
        .component('homePage', {
            templateUrl: 'app/homePage/homePage.tmpl.html',
            controller: ['Data', function (Data) {
		        const vm = this;

                vm.query = {
                    filter: ''
                };
                vm.clickItem = clickItem;
                vm.checkDiscount = checkDiscount;

		        vm.$onInit = () => {
                    vm.data = Data;
                    if (localStorage.appStoreData) {
                        vm.storeData = JSON.parse(localStorage.appStoreData);
                    }
                    else {
                        vm.storeData = {
                            selected: [],
                            count: 0,
                            quantity: []
                        };
                    }
		        };

		        function clickItem(itemId) {
                    if (vm.storeData.selected[itemId]) {
                        vm.storeData.selected[itemId] = false;
                        vm.storeData.quantity[itemId] = 1;
                        vm.storeData.count -= 1;
                        saveStoreData();
                    }
                    else {
                        vm.storeData.selected[itemId] = true;
                        vm.storeData.count += 1;
                        saveStoreData();
                    }
		        }

                function saveStoreData() {
                    localStorage.setItem('appStoreData', JSON.stringify(vm.storeData));
                }

                function checkDiscount(item) {
                    if (item.discount.isDiscount) {
                        return item.discount.param_1 +
                            ' units for the price of ' +
                            item.discount.param_2;
                    }
                }
    		}],
            controllerAs: 'vm'
        });
})();