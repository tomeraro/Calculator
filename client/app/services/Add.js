/**
 * Created by tomeraronovsky on 6/26/17.
 */
//

import Ioperations from './Ioperations';

class Add extends Ioperations {

  constructor() {
    'ngInject';

    super();

  }

  operation(a,b){
    return a + b;
  }


}

export default Add;
