import React, {  Fragment } from 'react';
import Producto from './Producto';

const Resumen = (props) => {
    const productos = props.productos;
    if(productos.length === 0) return (<p className="font-weight-bold mt-4">No hay productos seleccionados</p>);
    return ( 
        <Fragment>
            <h5 className="text-center">Resúmen y cantidades</h5>
            <table className=" table col-md-12 p-2">
                <thead className="text-light bg-primary">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) =>(
                        <Producto
                            key={producto.id}
                            id={producto.id}
                            producto={producto}
                            index={index}
                            updateCantidad = {props.updateCantidad}
                            eliminarProducto = {props.eliminarProducto}
                        />
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}
 
export default Resumen;