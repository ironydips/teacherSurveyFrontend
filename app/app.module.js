'use strict';

// Define the `bathwaterApp` module
angular.module('sellPurchaseApp', [
	'ui.router',
	'angular-google-gapi',
	'ngMessages',
	'naif.base64',
	'ui.bootstrap',
	'images-resizer',
	'720kb.datepicker',
	'ngAnimate',
	'ngSanitize', 
	'ui.select',
	'ui.bootstrap.datetimepicker',

	// For Notification
	'ngToast',
	//LightBox Library used as Image Viewer.
	'bootstrapLightbox',
	//Commmon modals
	'viewFullOrderModal',
	//Filters
	'sellPurchaseApp.commonModule',
	'sellPurchaseApp.services',
	'adminLayoutModule',
	'adminPanel',
	'adminSubPanel',
	'adminBrandDetailsModule',
	// 'sellPurchase',
	//'warehouseSubPanel',
	'purchaseDetail',
	'purchaseCheckout',
	//'sellDetail',
	//stock details
	'stockDetail',
	//order details
	'orderSubPanel',
	'orderDetail',
	//user
	'userSubPanel',
	'userSellerDetails'
]);
