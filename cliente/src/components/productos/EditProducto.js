import React, { Component, Fragment } from 'react';
import {Query} from 'react-apollo';
import FormularioProducto from './FormularioProducto';
import {PRODUCTO_QUERY} from '../../querys';
import { UPDATE_PRODUCTO } from '../../mutations';

class EditProducto extends Component {
    state = {  }
    render() {
        const {id} = this.props.match.params;
        console.log(id)
        return ( 
            <Fragment>
                <div className="row justify-content-center">
                    <h2 className="text-center mt-4 col-md-12">Editar producto</h2>
                    <Query query={PRODUCTO_QUERY} variables={{id}} refetchQueries={UPDATE_PRODUCTO}>
                        {({loading, error, data, refetch})=>{
                            if(loading) return 'Cargando...';
                            if(error) return `Error: ${error.message}`;
                            return (
                                <FormularioProducto
                                    producto = {data.getProducto}
                                    refetch = {refetch}
                                />
                            );
                        }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}
 
export default EditProducto;