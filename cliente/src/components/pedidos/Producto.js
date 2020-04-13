import React, { Component, Fragment } from 'react';

class Producto extends Component {
    state = {  }
    render() { 
        const {producto} = this.props;
        return ( 
            <Fragment>
                <tr className={`font-weight-bold ${producto.id}`}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.stock}</td>
                    <td>
                        <input 
                        min="1"
                        type="number" 
                        className="form-control" 
                        onChange={e => {
                            if(e.target.value > producto.stock){
                                e.target.value = 0;
                            }
                            this.props.updateCantidad(e.target.value, this.props.index)
                        }}
                        />
                    </td>
                    <td>
                        <button 
                        type="button"
                        className="btn btn-danger"
                        onClick={e => this.props.eliminarProducto(producto.id)}>
                            Eliminar
                        </button>
                    </td>
                </tr>
            </Fragment>
        );
    }
}
 
export default Producto;