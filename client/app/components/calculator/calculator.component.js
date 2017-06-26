import template from './calculator.html';
import controller from './calculator.controller';


let calculatorComponent = {
  bindings: {},
  template,
  controller,
  selector: 'calculator',
  styles: [ String(require('./calculator.scss'))]
};



export default calculatorComponent;

