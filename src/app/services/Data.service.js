(function() {

    'use strict';

	function Data() {

		const factory = [
			{
				id: 0,
				img: 'img/bananas.jpg',
				title: 'Bananas',
				price: 10,
				discount: {
					isDiscount: false,
					param_1: null,
					param_2: null
				}
			},
			{
				id: 1,
				img: 'img/mandarins.jpg',
				title: 'Mandarins',
				price: 16,
				discount: {
					isDiscount: false,
					param_1: null,
					param_2: null
				}
			},
			{
				id: 2,
				img: 'img/apples.jpg',
				title: 'Apples',
				price: 20,
				discount: {
					isDiscount: false,
					param_1: null,
					param_2: null
				}
			},
			{
				id: 3,
				img: 'img/papayas.jpg',
				title: 'Papayas',
				price: 300,
				discount: {
					isDiscount: true,
					param_1: 3,
					param_2: 2
				}
			}
		];
		
		return factory;
	}
	    	
  	angular
		.module("app")
		.factory("Data", Data);
})();