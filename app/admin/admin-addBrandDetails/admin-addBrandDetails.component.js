(function(angular) {

    'use strict';





    //--------------------------------Controller Start------------------------------------

    function AdminAddBrandController($state, $http, $uibModal, moveItemToSaleService) {
        var ctrl = this;
        ctrl.init = function() {
            ctrl.showTable = false;
            ctrl.$uibModal = $uibModal;
            ctrl.$state = $state;
            ctrl.className = {};
            ctrl.classObj = {};
            ctrl.classArr = [];
            ctrl.checked = "";
            ctrl.showMsg = false;
            ctrl.checkedClassArr;
            ctrl.loader = true;
            ctrl.enableSave = false;
            $http({
                url: "/getclassesSubjects",
                method: "GET",
            }).then(function(response) {
                if (response) {
                    ctrl.loader = false;
                    ctrl.classes = response.data.result.message;
                }
            }).catch(function(err) {
                console.log("error while admin login");
                console.log(err);
            });
        }
        ctrl.submitSubject = function(list, index) {
            ctrl.books = [];
            ctrl.checkedClassArr = list;
            if (index == undefined) {
                ctrl.showMsg = true;
            }
            // ctrl.filterClass = ctrl.classArr.filter(function(data, index){
            //     if(data.class == ctrl.className.name){
            //        //ctrl.classes.splice(index, 1);
            //        return data;
            //     }
            // });
            angular.forEach(list, function(value, key) {
                if (list[key].selected == list[key].subject) {
                    ctrl.books.push({ "subject": list[key].selected });
                    //list[key].selected = "";
                }
            });

            if (ctrl.books.length > 0) {
                var obj = {
                    "class": ctrl.className.name,
                    "subjects": ctrl.books
                };
                ctrl.classArr.push(obj);
                ctrl.className.name = "";
                ctrl.showTable = true;
            }

        }
        ctrl.setSubjects = function(className) {
            ctrl.subjectArr = ctrl.classes.filter(function(data) {
                if (data.class == className) {
                    return data.subjects;
                }
            });
            ctrl.filterClass = ctrl.classArr.filter(function(data, index) {
                if (data.class == className) {
                    //ctrl.classes.splice(index, 1);
                    return data;
                }
            });
            if (ctrl.filterClass.length == 0) {
                ctrl.enableSave = false;
            } else {
                ctrl.enableSave = true;
            }
        }
        ctrl.addTeacher = function(teacherDetail) {
            teacherDetail.classesSubject = ctrl.classArr;
            $http({
                    url: "/addTeacher",
                    method: "POST",
                    data: teacherDetail,
                }).then(function(response) {
                    if (response) {
                        ctrl.init();
                    }
                })
                .catch(function(error) {
                    debugger;
                });
        }
        ctrl.deleteSubject = function(index) {
            ctrl.classes.filter(function(data) {
                if (data.class == ctrl.classArr[index].class) {
                    debugger;
                    angular.forEach(data.subjects, function(value, key) {
                        data.subjects[key].selected = "";
                    });
                    //return data.subjects;
                }
            });
            ctrl.classArr.splice(index, 1);
            // ctrl.classes.filter(function(data, index) {
            //     if (data.class == ctrl.classArr[index].class) {
            //         angular.forEach(ctrl.subjectArr, function(value, key) {
            //             data.subjects[key].selected = "";
            //         });
            //     }
            // });

          //  ctrl.setSubjects(ctrl.classArr[index].class);
        }
        ctrl.editSubject = function(details, index) {
            details = angular.copy(details);
            ctrl.className.name = details.class;
            ctrl.classArr.splice(index, 1);
            ctrl.setSubjects(details.class);
        }
        ctrl.init();

        //--------------------------------Controller End------------------------------------


        //--------------------------------Pop-UP Implementation Start-----------------------------

        ctrl.openAddBrandPopUp = function openAddBrandPopUp(details) {

            var modalInstance = ctrl.$uibModal.open({
                component: 'addBrandModalComponent',
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
                    if (data) {
                        ctrl.classArr.filter(function(data, index) {

                        });
                        // popUpCtrl.showBrand(data.getBrand);
                        ctrl.init();

                    }

                }),
                function(err) {
                    console.log('Error in add-brand Modal');
                    console.log(err);
                }
        };

        ctrl.openBrandDetailPopUp = function openBrandDetailPopUp(details) {

            var modalInstance = ctrl.$uibModal.open({
                component: 'addBrandDetailsComponent',
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
                    if (data && data.action == 'update') {

                        // popUpCtrl.showVarient(data.brandObj, data.getVarient);
                        ctrl.init();
                    }

                }),
                function(err) {
                    console.log('Error in add-brand Modal');
                    console.log(err);
                }
        }


        //--------------------------------Pop-UP Implementation End-----------------------------

    }

    angular.module('adminBrandDetailsModule')
        .component('adminAddBrandDetailsComponent', {
            templateUrl: 'admin/admin-addBrandDetails/admin-addBrandDetails.template.html',
            controller: ['$state', '$http', '$uibModal', 'moveItemToSaleService', AdminAddBrandController]
        });

})(window.angular);