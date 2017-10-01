(function(angular) {
    'use strict';

    //-------------------CONTROLLER START------------------------------------------
    function ViewFullOrderModalController($state, $http, $uibModal) {
        var ctrl = this;
        ctrl.$uibModal = $uibModal;
        ctrl.$state = $state;

        ctrl.init = function() {


            ctrl.orderID = (ctrl.resolve && ctrl.resolve.details) || {};
            ctrl.classSubjectObj = {};
            ctrl.classSubjectArr = [];
            $http({
                    url: "/getclassesSubjects",
                    method: "GET",
                }).then(function(response) {
                    if (response) {
                        ctrl.classSubjectArr = response.data.result.message;
                    }
                })
                .catch(function(error) {
                    console.log("error while getting classes and subjects:");
                    console.log(error)
                });

        };

        ctrl.cancelBtn = function() {
            ctrl.modalInstance.close();
        };

        ctrl.addSubject = function() {
            var object = {
                "class": ctrl.classSubjectObj.class,
                "subjects": []
            }
            ctrl.editPopUP(object);
        }
        ctrl.editSubject = function(data) {
            ctrl.editPopUP(data);
        }
        ctrl.deleteClass = function(data) {
            $http({
                    url: "/deleteclassesSubjects?class=" + data.class,
                    method: "GET"
                }).then(function(response) {
                    if (response) {
                        ctrl.init();
                    }
                })
                .catch(function(error) {

                });
        }
        ctrl.save = function() {
            ctrl.modalInstance.close();
        }
        ctrl.init();

        //----------------------CONTROLLER END--------------------------------------------

        //-----------------------POP UP IMPLEMENTATION START------------------------------

        ctrl.editPopUP = function(details) {

            var modalInstance = ctrl.$uibModal.open({
                component: 'editOrderModalComponent',
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
                    if (data && data.action) {

                        ctrl.classSubjectObj.subjects = data.action;
                        var obj = angular.copy(ctrl.classSubjectObj);
                        ctrl.classSubjectArr.push(obj);
                        ctrl.classSubjectObj.class = "";
                    }


                    //if (data && data.action == "update");

                }),
                function(err) {
                    console.log('Error in edit-OrderDetail-Modal');
                    console.log(err);
                }
        }

        //-----------------------POP UP IMPLEMENTATION END---------------------------------


    }

    angular.module('viewFullOrderModal')
        .component('viewFullOrderModal', {
            templateUrl: 'commonModals/viewFull-order-modal/viewFull-order-modal.template.html',
            controller: ['$state', '$http', '$uibModal', ViewFullOrderModalController],
            bindings: {
                modalInstance: '<',
                resolve: '<'
            }
        });
})(window.angular);
