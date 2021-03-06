import CalculatorModule from './calculator';
import CalculatorController from './calculator.controller';
import CalculatorComponent from './calculator.component';
import CalculatorTemplate from './calculator.html';


describe('Calculator', () => {
  let $rootScope, makeController, $compile;

  beforeEach(window.module(CalculatorModule));

  beforeEach(inject(($injector) => {
    $compile = $injector.get('$compile');
  }));


  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CalculatorController();
    };
  }));


  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });


  describe('Component', () => {
    // component/directive specs
    let component = CalculatorComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(CalculatorTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(CalculatorController);
    });



    //****** custom unit tests ********//

    describe('View', () => {
      // view layer specs.
      let scope, template;

      beforeEach(() => {
        scope = $rootScope.$new();
        template = $compile('<calculator></calculator>')(scope);
        scope.$apply();
      });

        //check divide by zero alert handeling
        it('has error handling to catch divide by zero', () => {
          expect(template.find('h6').html()).to.eq(''); //on loading value is empty. when divide by zero it changes to 'error dividing'
        });

        //check reset button exist on dom
        it('reset button exist', () => {
          expect(template.find('button').attr("id","reset").html()).to.eq('Reset');
        });

    });

    //check value when start the calculator
    describe('Calculator Values', () => {

      it('total value on start should be 0', () => {
        let controller = makeController();
        expect(controller).to.have.property('output').to.eq('0');
      });

    });

    //check that calculator operations is separate from the controller logic
    describe('Logic Separation', () => {

      it('operations logic dont exist in the controller', () => {
        let controller = makeController();
          expect(controller).not.have.property('operations');
      });

    });


    //want to add tests for addition, subtraction, dividing and multiply
    //describe('Calculator', function() {
    //
    //  // inject the HTML for the tests
    //  beforeEach(function() {
    //    var calc= '<div id="test-area">' + '<div class="row" id="result"></div>' +
    //      '<div class="row row-common">' +
    //      '<button ng-click="$ctrl.userInput(0)" id="x">0</button>'+
    //      '<button ng-click="$ctrl.userInput(1)" id="y">1</button>' +
    //      '<button ng-click="$ctrl.calculateResult()" id="calc">=</button>' +
    //      '</div>';
    //
    //    document.body.insertAdjacentHTML('afterbegin', calc);
    //  });
    //
    //  let scope, template;
    //
    //  beforeEach(() => {
    //    scope = $rootScope.$new();
    //    template = $compile('<calculator></calculator>')(scope);
    //    scope.$apply();
    //  });
    //
    //  afterEach(function() {
    //    document.body.removeChild(document.getElementById('test-area'));
    //  });
    //
    //  it('should return 1 for 0 + 1', function() {
    //    document.getElementById('x').click();
    //    document.getElementById('y').click();
    //    document.getElementById('calc').click();
    //    expect(document.getElementById('result').innerHTML).to.eq('1');
    //  });
    //
    //
    //
    //});





  });
});
