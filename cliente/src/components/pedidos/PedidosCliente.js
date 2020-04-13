import React, { Fragment } from 'react';
import {OBTENER_PEDIDOS} from '../../querys';
import { Query } from 'react-apollo';
import Pedido from './Pedido';

const PedidosCliente = (props) => {
    const cliente = props.match.params.id;
    return ( 
    <Fragment>
        <div className="row justify-content-center">
                <h1 className="mt-4 mb-4 col-md-12 text-center">Pedidos</h1>
                <Query query={OBTENER_PEDIDOS} pollInterval={500} variables={{cliente}}>
                    {({loading, error, data, startPolling, stopPolling})=>{
                        if(loading) return (
                            <div className="spinner">
                                <div className="double-bounce1"></div>
                                <div className="double-bounce2"></div>
                            </div>
                        )
                        if(error) return `Error: ${error.message}`;
                        return (
                            data.getPedidos.map(pedido => (
                                <Pedido
                                    key={pedido.id}
                                    pedido={pedido}
                                    cliente={cliente}   
                                    
                                />
                            ))
                        )
                    }}
                </Query>
            </div>
    </Fragment>
    );
}
 
export default PedidosCliente;