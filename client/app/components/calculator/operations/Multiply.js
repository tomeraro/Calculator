/**
 * Created by tomeraronovsky on 6/26/17.
 */
//

import Ioperations from './Ioperations';

class Multiply extends Ioperations {

  constructor(){
    super();
  }

  operation(a,b){
    return a * b;
  }

}

export default Multiply;

