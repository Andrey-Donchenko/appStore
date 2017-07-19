(function() {
    
    'use strict';

    angular
        .module('app')
        .component('cartPage', {
            templateUrl: 'app/cartPage/cartPage.tmpl.html',
            controller: ['$state', 'Data', function ($state, Data) {
		        const vm = this;

                const discount = [];
                const amount = [];
                vm.checkSelected = checkSelected;
                vm.getDiscount = getDiscount;
                vm.getAmount = getAmount;
                vm.toPay = toPay;
                vm.changeQuantity = changeQuantity;

                vm.$onInit = () => {
                    if (localStorage.appStoreData) {
                        vm.storeData = JSON.parse(localStorage.appStoreData);
                        if (vm.storeData.count === 0) {
                            $state.go('home');
                        }
                    }
                    else {
                        $state.go('home');
                    }
                    vm.data = Data;
                };

                function checkSelected(item) {
                    if (vm.storeData.selected[item.id]) {
                        vm.storeData.quantity[item.id] = vm.storeData.quantity[item.id] || 1;
                        return true;
                    }
                }

                function getDiscount(item) {
                    if (!item.discount.isDiscount) {
                        return discount[item.id] = 0;
                    }
                    else if(vm.storeData.quantity[item.id] < item.discount.param_1) {
                        return discount[item.id] = 0;
                    }
                    else {
                        discount[item.id] = Math.floor(vm.storeData.quantity[item.id] / item.discount.param_1) *
                            item.price * (item.discount.param_1 - item.discount.param_2);
                        return discount[item.id];
                    }
                }

                function getAmount(item) {
                    amount[item.id] = vm.storeData.quantity[item.id] * item.price;
                    return amount[item.id];
                }

                function toPay() {
                    if (amount.length === 0) {
                        return 0;
                    }
                    else {
                        return amount.reduce((x, y) => x + y) - discount.reduce((x, y) => x + y);
                    }
                }

                function changeQuantity() {
                    localStorage.setItem('appStoreData', JSON.stringify(vm.storeData));
                }

    		}],
            controllerAs: 'vm'
        });
})();