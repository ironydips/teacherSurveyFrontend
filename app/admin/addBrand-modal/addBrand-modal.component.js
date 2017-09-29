(function(angular) {

    'use strict';

    //-----------------------------Controller Start------------------------------------

    function AddBrandModalController($state, $http) {
        var ctrl = this;

        ctrl.init = function() {

            ctrl.inputs = (ctrl.resolve && ctrl.resolve.details) || [];
            
        }
        ctrl.submitSubjects = function(subject){
            var obj = {
                "class": ctrl.inputs.class,
                "subjects": subject
            }
            ctrl.modalInstance.close({subject : obj, class: ctrl.inputs.class});
        }

        ctrl.cancel = function() {
            ctrl.modalInstance.close();
        };

        ctrl.init();

//------------------------------------Controller End------------------------------------
    }

    angular.module('addBrandModalModule')
        .component('addBrandModalComponent', {
            templateUrl: 'admin/addBrand-modal/addBrand-modal.template.html',
            controller: ['$state', '$http', AddBrandModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });

})(window.angular);
