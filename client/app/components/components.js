import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Calculator from './calculator/calculator';

let componentModule = angular.module('app.components', [
  Home,
  About,
  Calculator
])

.name;

export default componentModule;
