//Calculator class manage the UI executions.
//I've separated the UI manipulations from the operations Logic
class CalculatorController {

  constructor(Add, Subtract, Multiply, Divide) {
    'ngInject';

    this.name = "calculatorComponent"; //just for unit testing
    this.output = "0";
    this.numValue = null; //right number
    this.isNewNumber = true;
    this.currentOperationToExecute = null;
    this.resultUntilNow = null; ///the result until now. (left number for next operation)
    this.saveLastOperation = null; //save last operation if user clicked =,=,=

    //**** separate logic from UI - All Operations are Singleton Services ****//
    this._Add = Add;
    this._Subtract = Subtract;
    this._Multiply = Multiply;
    this._Divide = Divide;
  }

  //execute when user click on number
  userInput = function(btnValue)
  {
    //when user hit new number after equal function executed
    if(this.currentOperationToExecute == null){
      this.resultUntilNow = null;
      this.numValue = null;
    }

    if (this.isNewNumber || this.output == "0")
    {
      this.isNewNumber = false;
      this.output = btnValue;
    }
    else this.output += String(btnValue); //number is bigger than one digit

    this.numValue = Number(this.output);
  };

  //when user click on + , - , * or /
  operationClick = function(operationType)
  {
    this.lastCalculation(); //do last calculation before continue
    this.output = this.resultUntilNow; //update output to previous calculation
    this.isNewNumber = true;
    this.numValue = null;
    this.currentOperationToExecute = operationType; //save current operation
  };

  //do last calculation
  lastCalculation = function()
  {
    if (this.numValue) //if num value is not null
    {
      if(this.resultUntilNow){
        if(this.currentOperationToExecute in this.operationsObject) // check object literal contains operation
          this.resultUntilNow = this.operationsObject[this.currentOperationToExecute].operation(this.resultUntilNow, this.numValue);
        else {
          alert('Your Last Operation is Unknown! Calculator will restart now..');
          this.resetCalculator();
        }
      }
    else this.resultUntilNow = this.numValue; //for the first operation only
    }
  };

  //calculate result
  calculateResult = function()
  {
    if (!this.isNewNumber)
    {
      this.numValue = Number(this.output); //output is the 'right number'
      this.lastValue = this.numValue; //save last value in case we need it later
    }

    if(this.currentOperationToExecute != null)
    {
      //save last operation in case we need it later
      this.saveLastOperation = this.currentOperationToExecute;

      if(this.currentOperationToExecute in this.operationsObject) // check object literal contains operation
        this.resultUntilNow = this.operationsObject[this.currentOperationToExecute].operation(this.resultUntilNow, this.numValue);
      else {
        alert('Your Last Operation is Unknown! Calculator will restart now..');
        this.resetCalculator();
      }
    }
    else //user clicked = more than one time in a row
    {
      if (this.saveLastOperation != null)
      {
        if (this.resultUntilNow)
        {
          if(this.saveLastOperation in this.operationsObject) // check object literal contains operation
            this.resultUntilNow = this.operationsObject[this.saveLastOperation].operation(this.resultUntilNow, this.lastValue);
          else {
            alert('Your Last Operation is Unknown! Calculator will restart now..');
            this.resetCalculator();
          }
        }
      }
      else
        this.resultUntilNow = 0;
    }

    this.output = this.resultUntilNow;
    this.isNewNumber = true;
    this.currentOperationToExecute = null;
    this.numValue = null;
  }

  //reset current result to 0, and also reset all operations
  resetCalculator = function()
  {
    this.resultUntilNow = null;
    this.numValue = null;
    this.currentOperationToExecute = null;
    this.saveLastOperation = null;
    this.output = "0";
    this.isNewNumber = true;
  };

  //check the operation and execute
  //in previous version operationsObject was makeCalculation()
  operationsObject = {
    add: {
      name: 'add',
      operation: (a,b) => { return this._Add.operation(a,b) }
    },
    subtract: {
      name: 'subtract',
      operation: (a,b) => { return this._Subtract.operation(a,b) }
    },
    multiply: {
      name: 'multiply',
      operation: (a,b) => { return this._Multiply.operation(a,b) }
    },
    divide: {
      name: 'divide',
      operation: (a,b) => { return this._Divide.operation(a,b) }
    }
  };
}

export default CalculatorController;
