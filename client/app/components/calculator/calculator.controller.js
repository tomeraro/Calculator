//according to solid>> CalculatorController class have one roll: do calculations. I can reuse calculator component in another pages
class CalculatorController {

  constructor() {
    this.name = "calculatorComponent"; //just for unit testing

    this.output = "0";
    this.numValue = null; //right number
    this.isNewNumber = true;
    this.currentOperationToExecute = null;
    this.resultUntilNow = null; ///the result until now and left number for the next execution
    this.saveLastOperation = null; //save last operation to execute when clicking =,=,=, etc.

    //separate class who only make the operations. "black box" that get numbers and calculate them
    this.operationsClass = new MakeOperations();
  }

  //get value when user click on number
  userInput = function(btnValue)
  {
    if (this.isNewNumber || this.output == "0" || this.output == "")
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
    this.currentOperationToExecute = operationType;
  };

  //do last calculation
  lastCalculation = function()
  {
    if (this.numValue)
    {
      if(this.resultUntilNow)
        this.resultUntilNow = this.operationsClass.operations[this.currentOperationToExecute].operation(this.resultUntilNow, this.numValue);
      else
        this.resultUntilNow = this.numValue;
    }
  };

  //calculate result
  calculateResult = function()
  {
    if (!this.isNewNumber)
    {
      this.numValue = Number(this.output);
      this.lastValue = this.numValue;
    }

    if(this.currentOperationToExecute != null)
    {
      //save last operation in case we need it later
      if (this.currentOperationToExecute == this.operationsClass.operations.add.name)
      {
        this.saveLastOperation = 'add';
      }
      else if (this.currentOperationToExecute == this.operationsClass.operations.subtract.name)
      {
        this.saveLastOperation = 'subtract';
      }
      else if (this.currentOperationToExecute == this.operationsClass.operations.multiply.name)
      {
        this.saveLastOperation = 'multiply';
      }
      else if (this.currentOperationToExecute == this.operationsClass.operations.divide.name)
      {
        this.saveLastOperation = 'divide';
      }

      this.resultUntilNow = this.operationsClass.operations[this.currentOperationToExecute].operation(this.resultUntilNow, this.numValue);
    }
    else //user clicked = more than one time in a row
    {
      if (this.saveLastOperation != null)
      {
        if (this.resultUntilNow)
        {
          this.resultUntilNow = this.operationsClass.operations[this.saveLastOperation].operation(this.resultUntilNow, this.lastValue);
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
  }

}

export default CalculatorController;


//basic operations class with single responsibility: do operations.
// will be easy to add more arithmetic operations if needed
export class MakeOperations {

  constructor() {
    this.operations = {
      add: {
        name: 'add',
        operation: function (a, b) {
          return a + b;
        }
      },
      subtract: {
        name: 'subtract',
        operation: function (a, b) {
          return a - b;
        }
      },
      multiply: {
        name: 'multiply',
        operation: function (a, b) {
          return a * b;
        }
      },
      divide: {
        name: 'divide',
        operation: function (a, b) {
          if(b == 0){
            $("#hidden-error").html("error dividing");
            alert("you can't devide by 0. try again");
            return a;
          }
          return a / b;
        }
      }
    };
  }
}
