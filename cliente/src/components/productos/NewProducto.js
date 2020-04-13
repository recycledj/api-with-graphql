import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import {CREAR_PRODUCTO} from '../../mutations';

class NewProducto extends Component {
    state = { 
        producto: {
            nombre: '',
            precio: '',
            stock: ''
        }
    }
    validarForm = e =>{
        const {nombre, precio, stock} = this.state.producto;
        const invalid = !nombre || !precio || !stock;
        return invalid;
    }
    render() { 
        return ( 
            <Fragment>
                <div className="row justify-content-center">
                    <h2 className="text-center mt-4 col-md-12">Crear producto</h2>
                    <div className="col-md-8">
                        <Mutation mutation={CREAR_PRODUCTO}
                        onCompleted={() => this.props.history.push('/productos')}
                        >
                        {crearProducto => (
                        <form onSubmit={e =>{
                            const {nombre, precio, stock} = this.state.producto;
                            e.preventDefault();
                            const input = {
                                nombre,
                                precio: Number(precio),
                                stock: Number(stock)
                            }
                            crearProducto({variables:{input}})
                        }}>
                            <div className="form-group col-md-12">
                                <label className="font-weight-normal">Nombre</label>
                                <input 
                                type="text" 
                                name="nombre" 
                                className="form-control" 
                                placeholder="Ejem: Lenovo, iPhone, Oster" 
                                onChange={ e => {
                                    this.setState({
                                        producto:
                                        {
                                            ...this.state.producto,
                                            nombre: e.target.value
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
                                onChange={e =>{
                                    this.setState({
                                        producto:
                                        {
                                            ...this.state.producto,
                                            precio:e.target.value
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
                                onChange={e => {
                                    this.setState({
                                        producto:
                                        {
                                            ...this.state.producto,
                                            stock:e.target.value
                                        }
                                    })
                                }}/>
                            </div>
                            <div className="row justify-content-center">
                                <button type="submit" className="btn btn-success justify-content-center" disabled={this.validarForm()}>Guardar</button>
                            </div>
                        </form>
                        )}
                        </Mutation>
                    </div>
                </div>
            </Fragment>
        );
    }
}
 
export default NewProducto;