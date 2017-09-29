(function(angular) {

'use strict';
//addAdmin
function AdminPanelController($state, $http) {
	var ctrl = this;
	ctrl.showError = false;
	ctrl.adminLogin = function(userName){
		if(userName == undefined){
			ctrl.showError = true;
		}

		$http({
                url: "/validateAdmin?emailAddress=" + userName,
                method: "GET",
            }).then(function(response) {
                if(response.data.result.message != null){
					$state.go("order.orderDetail");
                }else{
                	ctrl.showError = true;
                }
            }).catch(function(err) {
                console.log("error while admin login");
                console.log(err);
            });
	}
}

angular.module('adminPanel')
.component('adminPanel',{
	templateUrl: 'admin/admin-panel/admin-panel.template.html',
	controller:['$state', '$http', AdminPanelController]
});

})(window.angular);