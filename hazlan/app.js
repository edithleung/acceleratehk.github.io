'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.version'
]).controller('MainCtrl', ['$scope', '$filter', 'jsonService', function ($scope, $filter, jsonService) {

    $scope.choiceChecking = {};
    $scope.choiceChecking.primaryApp = null;
    $scope.choiceChecking.jointApp1 = null;
    $scope.choiceChecking.jointApp2 = null;

    $scope.basicSavings = {};
    $scope.basicSavings.primaryApp = null;
    $scope.basicSavings.jointApp1 = null;
    $scope.basicSavings.jointApp2 = null;

    $scope.cdInterestMat = {};
    $scope.cdInterestMat.primaryApp = null;
    $scope.cdInterestMat.jointApp1 = null;
    $scope.cdInterestMat.jointApp2 = null;

    $scope.accType = {};
    $scope.accType.sole = 'Sole';
    $scope.accType.joint = 'Joint';
    $scope.accType.na = 'N/A';

    $scope.options = {};
    $scope.options.choiceChecking = [];
    $scope.options.basicSavings = [];
    $scope.options.cdInterestMat = [];


    $scope.initOpts = function () {
        console.log('dasdsa');

        jsonService.getChoiceCheckOpts(function (data) {
            console.log(data);
            $scope.options.choiceChecking = data;
        });
        jsonService.getBasicSavingsOpts(function (data) {
            console.log(data);
            $scope.options.basicSavings = data;
        });
        jsonService.getCdInterestMatOpts(function (data) {
            console.log(data);
            $scope.options.cdInterestMat = data;
        });
    };

    $scope.getAccountType = function (product) {
        if (product.primaryApp) {
            if (product.jointApp1 || product.jointApp2) {
                return $scope.accType.joint
            } else {
                return $scope.accType.sole;
            }
        } else {
            return $scope.accType.na;
        }
    };

}]).service('jsonService', ['$http', function ($http) {

    this.getChoiceCheckOpts = function (callback) {
        $http.get("data/choice-checking.json").success(function (res) {
            callback(res.referData.record);
        }).error(function () {
            console.log('fetch failed');
        });
    };
    this.getBasicSavingsOpts = function (callback) {
        $http.get("data/basic-savings.json").success(function (res) {
            callback(res.records);
        }).error(function () {
            console.log('fetch failed');
        });
    };
    this.getCdInterestMatOpts = function (callback) {
        $http.get("data/cd-interest-at-maturity.json").success(function (res) {

            //normalize keys
            var optionsArr = [];
            for (var keyName in res.referData.record) {
                var key = keyName;
                var value = res.referData.record[keyName];
                optionsArr = optionsArr.concat({id: key, firstName: value.firstName, lastName: value.lastName});
            }

            callback(optionsArr);
        }).error(function () {
            console.log('fetch failed');
        });
    };
}]);
