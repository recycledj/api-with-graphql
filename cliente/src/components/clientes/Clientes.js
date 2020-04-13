import React, {Fragment, Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import {CLIENTES_QUERY} from '../../querys';
import {Link} from 'react-router-dom';
import {DELETE_CLIENTE} from '../../mutations';
import Paginador from '../paginador';
class Clientes extends Component {
    limit = 5;
    state = { 
        paginador:{
            offset: 0,
            actual: 1
        },
        alerta :
        {
            mostrar: false,
        }
     }
     PaginaAnterior = () =>
     {
        this.setState({
            paginador: 
            {
                offset: this.state.paginador.offset - this.limit,
                actual: this.state.paginador.actual - 1
            }
        })
     }
     PaginaSiguiente = () => 
     {
        this.setState({
            paginador:
            {
                offset: this.state.paginador.offset + this.limit,
                actual: this.state.paginador.actual + 1
            }
        })
     }
    render() { 
        const {alerta: {mostrar}} = this.state;
        const alerta = (mostrar) ? <p className="alert alert-success col-md-12">Eliminado correctamente</p> : '';
        return ( 
            <Fragment>
                <Query query={CLIENTES_QUERY} pollInterval={500} variables={{limit: this.limit, offset: this.state.paginador.offset}}>
                {({loading, error, data, startPolling, stopPolling})=>{
                    if(loading) return (<div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>);
                    if(error) return `Error: ${error.message}`;
                    return (
                        <div className="row justify-content-center">
                            <h2 className="text-center col-md-12 mt-2">Clientes</h2>
                            {alerta}
                            <table className="table col-md-12 mt-4 border border-dark">
                                <thead>
                                    <tr className="bg-primary text-light">
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Tipo de cliente</th>
                                        <th className="text-center">Pedido</th>
                                        <th className="text-center">Ver pedidos</th>
                                        <th className="text-center">Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.getClientes.map(item =>{
                                        const {id} = item;
                                        return (
                                            <tr key={item.id} className="font-weight-normal">
                                                <td>{item.nombre}</td>
                                                <td>{item.apellido}</td>
                                                <td>{item.tipo}</td>
                                                <td><Link to={`/pedidos/nuevo/${id}`} className="btn btn-warning d-block"> &#43; Nuevo pedido</Link></td>
                                                <td><Link to={`/pedidos/${item.id}`} className="btn btn-primary d-block" id={id}>Ver pedidos</Link></td>
                                                <td><Link to={`/cliente/editar/${item.id}`} className="btn btn-success col-md-12">Editar</Link></td>
                                                <td>
                                                    <Mutation mutation={DELETE_CLIENTE}
                                                    onCompleted={(data) =>{
                                                        this.setState({
                                                            alerta : {
                                                                mostrar: true,
                                                                mensaje: ''
                                                            }
                                                        })
                                                        setTimeout(()=>{
                                                            this.setState({
                                                                alerta : {
                                                                    mostrar: false,
                                                                    mensaje: ''
                                                                }
                                                            })
                                                        }, 3000)
                                                        
                                                    }}
                                                    >
                                                    {deleteProducto => (
                                                        <button className="btn btn-danger col-md-12"
                                                        onClick={()=>{
                                                            if(window.confirm('¿Seguro de que quiere eliminar este dato?'))
                                                            {
                                                                deleteProducto({variables:{id}})
                                                            }
                                                        }}
                                                        >
                                                        Eliminar
                                                        </button>
                                                    )}
                                                    </Mutation>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Paginador
                            totalClientes= {data.totalClientes}
                            actual = {this.state.paginador.actual}
                            limit = {this.limit}
                            PaginaAnterior = {this.PaginaAnterior}
                            PaginaSiguiente = {this.PaginaSiguiente}
                            />
                        </div>
                    )
                }}
                </Query>
            </Fragment>
        );
    }
}
 
export default Clientes;