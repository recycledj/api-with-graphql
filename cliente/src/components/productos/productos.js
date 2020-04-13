import React, { Component, Fragment } from 'react';
import {Query, Mutation} from 'react-apollo';
import {PRODUCTOS_QUERY} from '../../querys';
import {Link} from 'react-router-dom';
import {DELETE_PRODUCTO} from '../../mutations';
import Paginador from './paginador';
class Productos extends Component {
    limit = 5;
    state = { 
        paginador:{
            offset: 0,
            actual: 1
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
        return ( 
            <Fragment>
            <Query query={PRODUCTOS_QUERY} pollInterval={500} variables={{limit: this.limit, offset: this.state.paginador.offset}}>
                {({loading, error, data, startPolling, stopPolling}) =>
                {
                    if(loading) return 'Cargando...';
                    if(error) return `Error: ${error.message}`;
                    return (
                        <div className="row justify-content-center">
                            <h2 className="text-center mt-4">Productos</h2>
                            <table className="table col-md-12 mt-4 border border-dark">
                                <thead className="bg-dark">
                                    <tr className="text-light bg-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col" className="text-center">Editar</th>
                                        <th scope="col" className="text-center">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.getProductos.map(item =>{
                                        const {id} = item;
                                        const {stock} = item;
                                        let clase;
                                        if(stock < 50)
                                        {
                                            clase = 'table-danger';
                                        } else if (stock > 51 && stock < 101)
                                        {
                                            clase = 'table-warning';
                                        }else 
                                        {
                                            clase = '';
                                        }
                                        return(
                                        <tr key={id} className={`font-weight-normal border border-dark ${clase}`}>
                                            <td className="">{item.nombre}</td>
                                            <td className="">${item.precio}</td>
                                            <td className="">{item.stock}</td>
                                            <td className=""><Link to={`/productos/editar/${id}`} className="btn btn-success col-md-12">
                                                Editar
                                            </Link></td>
                                            <td className="">
                                               <Mutation mutation={DELETE_PRODUCTO}>
                                                   {deleteProducto => (
                                                       <button 
                                                       type="button" 
                                                       className="col-md-12 btn btn-danger"
                                                       onClick={() =>{
                                                           if(window.confirm('¿Seguro que deseas eliminar este dato?'))
                                                           {
                                                               deleteProducto({variables:{id}})
                                                           }
                                                       }}
                                                       >&times; Eliminar</button>
                                                   )}
                                               </Mutation> 
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <Paginador
                                totalProductos = {data.totalProductos}
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
 
export default Productos;