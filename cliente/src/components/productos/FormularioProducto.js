import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import {UPDATE_PRODUCTO} from '../../mutations';
import {withRouter} from 'react-router-dom';
class FormularioProducto extends Component {
    state = { 
      producto : this.props.producto,
      error: false
    }
    validateForm = e => {
        const {nombre, precio, stock} = this.state.producto;
        const invalid = !nombre || !precio || !stock;
        return invalid;
    }
    render() { 
        const {nombre, precio, stock} = this.state.producto;
        return (
            <Fragment>
                <Mutation mutation={UPDATE_PRODUCTO}
                onCompleted={() =>{
                    this.props.refetch().then(()=>{
                        this.props.history.push("/productos")
                    })
                }}
                >
                    {updateProducto => (
                    <form 
                    onSubmit={e=>{
                    e.preventDefault();
                    const {id, nombre, precio, stock} = this.state.producto;
                    const input = {
                        id, 
                        nombre,
                        precio:Number(precio),
                        stock:Number(stock)
                    }
                    updateProducto({variables:{input}})
                }}
                >
                    <div className="form-group col-md-12">
                        <label className="font-weight-normal">Nombre</label>
                        <input 
                        type="text" 
                        name="nombre" 
                        className="form-control" 
                        placeholder="Ejem: Lenovo, iPhone, Oster"
                        defaultValue={nombre} 
                        onChange={e => {
                            this.setState({
                                producto:
                                {
                                    ...this.state.producto,
                                    nombre:e.target.value
                                }
                            })
                        }}/>
                    </div>
                    <div className="form-group col-md-6 float-left">
                        <label className="font-weight-normal">Precio</label>
                        <input 
                        type="number" 
                        name="precio" 
                        className="form-control" 
                        placeholder="Precio del producto, sin signo de dólar" 
                        defaultValue={precio}
                        onChange={e => {
                            this.setState({
                                producto:
                                {
                                    ...this.state.producto,
                                    precio : e.target.value
                                }
                            })
                        }}/>
                    </div>
                    <div className="form-group col-md-6 float-left">
                        <label className="font-weight-normal">Stock</label>
                        <input 
                        type="number" 
                        name="stock" 
                        className="form-control" 
                        placeholder="Cantidad de productos que se tiene" 
                        defaultValue={stock}
                        onChange={e => {
                            this.setState({
                                producto:{
                                    ...this.state.producto,
                                    stock : e.target.value
                                }
                            })
                        }}/>
                    </div>
                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-success justify-content-center" disabled={this.validateForm()}>Guardar</button>
                        </div>
                    </form>
                    )}
                </Mutation>
            </Fragment>
        );
    }
}
 
export default withRouter(FormularioProducto);