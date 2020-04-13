import React, {Component, Fragment} from 'react';
import {CLIENTE_QUERY} from '../../querys';
import {Query} from 'react-apollo';
import FormularioEditCliente from './FormularioEditCliente';
import { UPDATE_CLIENTE} from '../../mutations';

class EditCliente extends Component {
    render() { 
        //Tomar id
        const {id} = this.props.match.params;
        return ( 
            <Fragment>
                <h2 className="text-center mt-4">Editar cliente</h2>
                <div className="justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{id}} refetchQueries={UPDATE_CLIENTE}>
                    {({loading, error, data, refetch}) =>{
                        if(loading) return 'Cargando...';
                        if(error) return `Error: ${error}`;
                        return (
                            <FormularioEditCliente
                                cliente = {data.getCliente} 
                                refetch = {refetch}
                            />
                        )
                    }}
                    </Query>
                </div>
            </Fragment>
        );
    }
}
 
export default EditCliente;