import React, {Component, Fragment} from 'react';
import Select from 'react-select';
import Animated from 'react-select/animated';
import Resumen from './resume'
import GenerarPedido from './GenerarPedido';

class ContenidoPedido extends Component {
    state = { 
        productos: [],
        total: 0
    }
    seleccionarProductos = (productos) =>{
        this.setState({productos})
    }
    updateCantidad = (cantidad, index) => {
        
        const productos = this.state.productos;
        productos[index].cantidad = Number(cantidad);
        //Actualizar la cantidad de productos

        //Validamos

        //Agregamos el state
        this.setState({
            productos
        }, () => {
            this.actualizarTotal();
        })
    }
    actualizarTotal = () =>{
        const productos = this.state.productos;

        let nuevoTotal = 0;
        if(productos.length === 0)
        {
            this.setState({
                total: 0
            });
            return;
        }

        //realizar cantidad precio x productos 
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio))
        this.setState({total:nuevoTotal})
    }
    eliminarProducto = (id) =>{
        const productos = this.state.productos;
        const pRestantes = productos.filter(producto => producto.id !== id);

        this.setState({productos:pRestantes}, () => {
            this.actualizarTotal();
        })
        
    }
    render() { 
        return ( 
            <Fragment>
                <h4 className="mg-5 mt-2 text-center">Seleccionar articulos</h4>
                <Select 
                    onChange={this.seleccionarProductos}
                    options={this.props.productos}
                    isMulti={true}
                    components={Animated()}
                    placeholder={'Seleccionar productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.nombre}
                    value={this.state.productos}
                />
                <Resumen
                    productos = {this.state.productos}
                    updateCantidad = {this.updateCantidad}
                    eliminarProducto = {this.eliminarProducto}
                />
                <p className="font-weight-bold float-right mt-4">Total: <span className="font-weight-normal">${this.state.total}</span></p>
                <GenerarPedido
                    productos = {this.state.productos}
                    total = {this.state.total}
                    idCliente = {this.props.id}
                />
            </Fragment>
        );
    }
}
 
export default ContenidoPedido;