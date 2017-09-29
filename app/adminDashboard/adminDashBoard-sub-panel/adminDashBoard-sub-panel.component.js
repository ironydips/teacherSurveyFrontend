(function(angular) {

'use strict';

function OrderSubPanelController($state) {
	var ctrl = this;
}

angular.module('orderSubPanel')
.component('orderSubPanel',{
	templateUrl: 'adminDashboard/admin-sub-panel/admin-sub-panel.template.html',
	controller:['$state', OrderSubPanelController]
});

})(window.angular);