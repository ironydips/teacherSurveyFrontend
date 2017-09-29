'use strict';

function viewFullOrderPopUp(details) {

    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
        component: 'viewFullOrderModal',
        windowClass: 'app-modal-window-large',
        keyboard: false,
        resolve: {
            details: function() {
                return (details || {});
            }
        },
        backdrop: 'static'
    });

    modalInstance.result.then(function(data) {
            //data passed when pop up closed.

            //if (data && data.action == "update");

        }),
        function(err) {
            console.log('Error in view-Full-Order-Modal');
            console.log(err);
        }
}
function viewMoreDetailPopUp(details){
    var popUpCtrl = this;
    var modalInstance = popUpCtrl.$uibModal.open({
        component: 'newPurchaserModal',
        windowClass: 'app-modal-window-small',
        keyboard: false,
        resolve: {
            details: function() {
                return (details || {});
            }
        },
        backdrop: 'static'
    });

    modalInstance.result.then(function(data) {
            //data passed when pop up closed.

            //if (data && data.action == "update");

        }),
        function(err) {
            console.log('Error in view-Full-Order-Modal');
            console.log(err);
        }
}

function OrderDetailController($state, $http, $timeout, $uibModal) {
    var ctrl = this;
    ctrl.$uibModal = $uibModal;
    ctrl.$state = $state;

    ctrl.init = function() {
        $http({
            url: "/getTeachers",
            method: "GET",
        }).then(function(response) {
            if (response) {
                ctrl.teachers = response.data.result.message;
            }
        }).catch(function(err) {
            console.log("error while admin login");
            console.log(err);
        });
    }
    ctrl.viewMoreDetail = function(detail){
        angular.bind(ctrl, viewMoreDetailPopUp, detail)();
    }
    ctrl.viewFullOrderModal = function() {

        angular.bind(ctrl, viewFullOrderPopUp, "")();
    };

    ctrl.init();
}

angular.module('orderDetail')
    .component('orderDetail', {
        templateUrl: 'adminDashboard/adminDashboard-detail/adminDashboard-detail.template.html',
        controller: ['$state', '$http', '$timeout', '$uibModal', OrderDetailController]
    });
