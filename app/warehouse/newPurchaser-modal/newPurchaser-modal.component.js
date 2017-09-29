(function(angular) {
    'use strict';

    function newPurchaserModalModalController($state, $http) {
        var ctrl = this;

        ctrl.init = function() {
            ctrl.teacherDetail = (ctrl.resolve && ctrl.resolve.details) || {};
        }
        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();
    }

    angular.module('newPurchaserModal')
        .component('newPurchaserModal', {
            templateUrl: 'warehouse/newPurchaser-modal/newPurchaser-modal.template.html',
            controller: ['$state', '$http', newPurchaserModalModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
