/**
 * Created by tomeraronovsky on 6/26/17.
 */
//

import Add from './Add';
import Subtract from './Subtract';
import Multiply from './Multiply';
import Divide from './Divide';

class ContextClass  {

  constructor(type){
      if(type == 'add')
        this.operationProperty = new Add();
      else if(type == 'subtract')
        this.operationProperty = new Subtract();
      else if(type == 'multiply')
        this.operationProperty = new Multiply();
      else if(type == 'divide')
        this.operationProperty = new Divide();
  }
}

export default ContextClass;

