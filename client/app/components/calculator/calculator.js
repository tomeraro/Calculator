import angular from 'angular';
import uiRouter from 'angular-ui-router';
import calculatorComponent from './calculator.component';
import  AddService from './../../services/Add';
import  SubtractService from './../../services/Subtract';
import  MultiplyService from './../../services/Multiply';
import  DivideService from './../../services/Divide';


let calculatorModule = angular.module('calculator', [
  uiRouter
])

.config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('calculator', {
        url: '/calculator',
        component: 'calculator'
      });
  })

  .component('calculator', calculatorComponent)
  .service('Add', AddService)
  .service('Subtract', SubtractService)
  .service('Multiply', MultiplyService)
  .service('Divide', DivideService)

  .name;

export default calculatorModule;
