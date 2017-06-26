/**
 * Created by tomeraronovsky on 6/26/17.
 */
//
import Ioperations from './Ioperations';

class Divide extends Ioperations {

  constructor(){
    'ngInject';

    super();
  }

  operation(a,b){
    if(b==0)
      return NaN;
    else return a / b;
  }

}
export default Divide;
