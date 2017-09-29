(function(angular) {
    'use strict';

    //--------------------------CONTROLLER START-----------------------------------------

    function EditOrderModalController($state, $http) {
        var ctrl = this;

        ctrl.init = function() {
             ctrl.update = false;
             ctrl.inputs = (ctrl.resolve && ctrl.resolve.details) || [];
             if(ctrl.inputs.subjects.length> 0){
                ctrl.update = true;
             }
        };
        ctrl.addSubject = function () {
            ctrl.inputs.subjects.push({})
        }
        ctrl.submitSubjects = function () {
            ctrl.classSubjectArr = {
                "class" : ctrl.inputs.class,
                "subjects" : ctrl.inputs.subjects
            }
            $http({
                    url: "/addClassSubject",
                    method: "POST",
                    data: ctrl.classSubjectArr,
                }).then(function(response) {
                    if (response) {
                        ctrl.modalInstance.close({ action: ctrl.inputs.subjects });
                    }
                })
                .catch(function(error) {

                });
            //ctrl.modalInstance.close({ action: ctrl.inputs.subjects });
        }
        ctrl.updateSubjects = function(details){
            var obj = {
                "class" : ctrl.inputs.class,
                "subjects" : ctrl.inputs.subjects
            }
            $http({
                    url: "/updateClassSubject?class=" + ctrl.inputs.class,
                    method: "POST",
                    data: ctrl.inputs.subjects
                }).then(function(response) {
                    if (response) {
                        ctrl.modalInstance.close();
                    }
                })
                .catch(function(error) {

                });
        }
        ctrl.cancelBtn = function() {

            ctrl.modalInstance.close();
        };

        ctrl.init();

        //-------------------------------CONTROLLER END-----------------------------------     
    }

    angular.module('editOrderModalModule')
        .component('editOrderModalComponent', {
            templateUrl: 'commonModals/edit-order-modal/edit-order-modal.template.html',
            controller: ['$state', '$http', EditOrderModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
