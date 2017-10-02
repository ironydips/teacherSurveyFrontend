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
            ctrl.classObj = {
                teacherName: '',
                gender: 'male',
                contactNumber: '',
                emailID: '',
                qualifications: '',
                address: '',
                teachingArea: '',
                teachingExperience: ''

            };
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
                    ctrl.classes = ctrl.classes.sort((a,b) => a.class*1 > b.class*1);
                }
            }).catch(function(err) {
                console.log("error while admin login");
                console.log(err);
            });
        }

        ctrl.submitSubject = function(list, index) {
            ctrl.classArr = ctrl.classArr.filter(data => data.class != ctrl.className.name);

            ctrl.books = [];
            ctrl.checkedClassArr = list;
            if (index == undefined) {
                ctrl.showMsg = true;
            }

            angular.forEach(list, function(value, key) {
                if (list[key].selected == list[key].subject) {
                    ctrl.books.push({ "subject": list[key].selected });
                }
            });

            if (ctrl.books.length > 0) {
                var obj = {
                    "class": ctrl.className.name * 1,
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
            })[0];
            
            var selectedClass = ctrl.classArr.filter(data => data.class == className)[0];

            if(selectedClass){
                ctrl.subjectArr.subjects.forEach(subjectData => {
                    subject.selected = selectedClass.subjects.map(data => data.subject).indexOf(subjectData.subject) > -1;
                });
            } else{
                ctrl.subjectArr.subjects.forEach(data => data.selected = false);
            }
        }

        var checkValidation = function(){
            var isValid = true;

            for(var index in ctrl.classObj){
                isValid = isValid && !!ctrl.classObj[index] && ctrl.classArr.length > 0;
            }

            return isValid;
        }

        ctrl.addTeacher = function(teacherDetail) {
            if(checkValidation()) {
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
            } else {
                alert('Please fill all the form fields');
            }
        }

        ctrl.deleteSubject = function(className) {
            ctrl.classArr = ctrl.classArr.filter(data => data.class != className);
        }

        ctrl.editSubject = function(details, index) {
            details = angular.copy(details);
            ctrl.className.name = details.class.toString();
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