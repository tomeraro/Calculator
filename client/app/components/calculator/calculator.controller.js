import ContextClass from './operations/ContextClass'

//Calculator class manage the UI executions.
//I've separated the UI manipulations from the operations Logic
class CalculatorController {

  constructor() {
    this.name = "calculatorComponent"; //just for unit testing

    this.output = "0";
    this.numValue = null; //right number
    this.isNewNumber = true;
    this.currentOperationToExecute = null;
    this.resultUntilNow = null; ///the result until now. (left number for next operation)
    this.saveLastOperation = null; //save last operation if user clicked =,=,=

    //**** separate logic from UI ****// "black box" that get numbers and calculate them
    this.Add = new ContextClass('add');
    this.Subtract = new ContextClass('subtract');
    this.Multiply = new ContextClass('multiply');
    this.Divide = new ContextClass('divide');


  }

  //execute when user click on number
  userInput = function(btnValue)
  {
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
    //if num value is not null
    if (this.numValue)
    {
      if(this.resultUntilNow)
        this.makeCalculation(this.currentOperationToExecute, this.resultUntilNow, this.numValue);
      else
        this.resultUntilNow = this.numValue; //for the first operation only
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
      this.makeCalculation(this.currentOperationToExecute, this.resultUntilNow, this.numValue);
    }
    else //user clicked = more than one time in a row
    {
      if (this.saveLastOperation != null)
      {
        if (this.resultUntilNow)
        {
          this.makeCalculation(this.saveLastOperation, this.resultUntilNow, this.lastValue);
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


  //check the operation and execute according to our stracture
  makeCalculation = function(operation, leftValue, rightValue)
  {
    if(operation == 'add')
      this.resultUntilNow = this.Add.operationProperty.operation(leftValue, rightValue);

    if(operation == 'subtract')
      this.resultUntilNow = this.Subtract.operationProperty.operation(leftValue, rightValue);

    if(operation == 'multiply')
      this.resultUntilNow = this.Multiply.operationProperty.operation(leftValue, rightValue);

    if(operation == 'divide')
      this.resultUntilNow = this.Divide.operationProperty.operation(leftValue, rightValue);
  }

}

export default CalculatorController;

