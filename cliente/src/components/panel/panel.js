import React, { Fragment } from 'react';
import Clientes from './clientes';
const Panel = () => {
    return ( 
       <Fragment>
           <h1 className="text-center my-5">Top 10 de clientes que más compran</h1>
           <Clientes/>
       </Fragment>
    );
}
 
export default Panel;