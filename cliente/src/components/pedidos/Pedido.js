import React, { Fragment } from 'react';
import {PRODUCTO_QUERY} from '../../querys';
import {UPDATE_PEDIDO} from '../../mutations';
import { Query, Mutation     } from 'react-apollo';
import ResumenProducto from './ResumenProducto';
const Pedido = (props) => {
    
    const pedido = props.pedido;
    
    const {id} = pedido;
    console.log(id)
    //Estado y clases de estado
    const {estado} = pedido;
    console.log(estado)
    let clase;
    if(estado==='PENDIENTE')
    {
        clase='border-warning';
    }else if (estado==='CANCELADO'){
        clase='border-danger';
    } else 
    {
        clase='border-success';
    }


    const fecha = new Date(Number(pedido.fecha));
    return ( 
        <Fragment>
            <div className="col-md-4">
                <div className={`card mb-3 ${clase}`}>
                    <div className="card-body">
                        <p className="card-text font-weight-bold">Estado:
                            <Mutation mutation={UPDATE_PEDIDO}>
                                {updatePedido => (
                                <select className="form-control my-3" value={pedido.estado}
                                onChange={e =>{
                                    const input = {
                                        id,
                                        pedido:pedido.pedido,
                                        fecha:pedido.fecha, 
                                        total:pedido.total, 
                                        cliente:props.cliente,
                                        estado:e.target.value
                                    }
                                    updatePedido({variables:{input}})
                                }}
                                >
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="CANCELADO">Cancelado</option>
                                    <option value="COMPLETADO">Completado</option>
                                </select>
                                )}
                            </Mutation> 
                        </p>
                        <p className="card-text font-weight-bold">Pedido ID:
                            <span className="font-weight-normal"> {pedido.id}</span>
                        </p>
                        <p className="card-text font-weight-bold">Fecha Pedido:
                            <span className="font-weight-normal"> {fecha.toLocaleString("es-CO")}</span>
                        </p>
                        <p className="card-text font-weight-bold">Total:
                            <span className="font-weight-normal"> ${pedido.total}</span>
                        </p>
                        <h4 className="card-text text-center mb-3">Artículos del pedido</h4>
                        {pedido.pedido.map((producto, index) =>{
                            
                            const {id} = producto;
                            return (
                                <Query key={pedido.id+index} query={PRODUCTO_QUERY} variables={{id}}>
                                    {({loading, error, data})=>{
                                        if(loading) return (
                                            <div className="spinner">
                                                <div className="double-bounce1"></div>
                                                <div className="double-bounce2"></div>
                                            </div>
                                        );
                                        if(error) return `Error: ${error.message}`;
                                        
                                        return (
                                            <ResumenProducto
                                                producto = {data.getProducto}
                                                cantidad = {producto.cantidad}
                                                key = {producto.id}
                                            />
                                        )
                                    }}
                                </Query>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Pedido;