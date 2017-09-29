// var array = {};
// response.data.result.message.forEach(function(data){
// 	Object.keys(array).indexOf(data.brandName) == -1 ? array[data.brandName] = [data] : array[data.brandName].push(data);
// })

'use strict';

//---------------------------------CONTROLLER START----------------------------------
function StockController($state, $http, $uibModal) {
    var ctrl = this;

    ctrl.init = function() {
        ctrl.array = {};
        ctrl.$state = $state;
        ctrl.$uibModal = $uibModal;
        ctrl.stockArr = [];
        ctrl.loader = true;
        var date;
        var d = new Date();
        var month = (d.getMonth() + 1);
        var day = d.getDate();
        var year = d.getFullYear();

        if (month < 10) {
            date = year + "-" + "0" + month + "-" + day;
        } else {
            date = year + "-" + month + "-" + day;
        }

        ctrl.fromDate = date;
        ctrl.todayDate = date;
        ctrl.showStock(ctrl.fromDate, ctrl.todayDate);

       
    };

    ctrl.showStock = function(fromDate, todayDate){                                                      

         $http({
            url: "stock/getCurrentStockInfo?fromDate="+ fromDate + "&endDate="+ todayDate,
            method: "GET"
        }).then(function(response) {
            ctrl.loader = false;
            ctrl.stockDetail = response.data.result.message;
            ctrl.stockDetail.forEach(function(data){
                data.todayDate = todayDate;
                data.fromDate = fromDate;
            })

        }).catch(function(error) {
            console.log("Error while getting stock data:");
            console.log(error);
        });
    }

    ctrl.viewFullDetail = function(itemDetail) {
        ctrl.viewFullPdtDetail(ctrl.stockDetail, itemDetail)
    }

    ctrl.init();

    //------------------- POP UPS START--------------------------------
    ctrl.viewFullPdtDetail = function viewFullPdtDetail(stockDetails, itemDetail) {

        var modalInstance = ctrl.$uibModal.open({
            component: 'viewFullPdtDetail',
            windowClass: 'app-modal-window-large',
            keyboard: false,
            resolve: {
                stockDetails: function() {
                    return (stockDetails || {});
                },
                itemDetail: function () {
                    return (itemDetail || {});
                }
            },
            backdrop: 'static'
        });

        modalInstance.result.then(function(data) {
                //data passed when pop up closed.
                if (data && data.action == "update") {
                   // popUpCtrl.init();
                }

            }),
            function(err) {
                console.log('Error in new-Purchase detail modal');
                console.log(err);
            }
    }
    //-----------------------POP UPS END-------------------------------------
}

//-----------------------------CONTROLLER END-----------------------------------------
angular.module('stockDetail')
    .component('stockDetail', {
        templateUrl: 'stock/stock-detail/stock-detail.template.html',
        controller: ['$state', '$http', '$uibModal', StockController]
    });
