(function() {

    'use strict';
   
    function config ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/');
        
		$stateProvider
    		.state("home", {
		    	url: '/',
		    	template: '<home-page></home-page>',
    		})
            .state("cart", {
                url: '/cart',
                template: '<cart-page></cart-page>'
            });
	}

	angular
        .module('app')
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            config
        ]);
})();
