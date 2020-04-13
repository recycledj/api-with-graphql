import React, { Component, Fragment } from 'react';
import DatosCliente from './DatosCliente';
import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../querys';
import '../../spinner.css';
import ContenidoPedido from './ContenidoPedido';

class NewPedido extends Component {
    state = {  }
    render() { 
        const {id} = this.props.match.params;
        return ( 
            <Fragment>
                <h1 className="text-center mt-2">Nuevo pedido</h1>
                <div className="row mt-4">
                    <div className="col-md-3">
                        <DatosCliente
                            id = {id}
                        />
                    </div>
                    <div className="col-md-9">
                        <h3 className="text-center">Pedido</h3>
                        <Query query={PRODUCTOS_QUERY} variables={{stock: true}}>
                            {({loading, error, data}) =>{
                                if(loading) return(
                                    <div className="spinner">
                                        <div className="double-bounce1"></div>
                                        <div className="double-bounce2"></div>
                                    </div>
                                )
                                if(error) return `Error: ${error.message}`
                                return (
                                    <ContenidoPedido
                                        productos = {data.getProductos}
                                        id={id}
                                    />
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default NewPedido;