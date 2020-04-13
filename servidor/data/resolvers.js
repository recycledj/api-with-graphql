import mongoose from 'mongoose';
import {Clientes, Productos, Pedidos} from './db';
import {rejects} from 'assert';

const resolvers = {
    Query: 
    {
        getClientes : (root, {limit, offset}) =>
        {
            return Clientes.find({}).limit(limit).skip(offset);
        },
        getCliente : (root, {id}) => {
            return new Promise((resolve, object) =>
            {
                Clientes.findById(id, (error, cliente) =>{
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        totalClientes : (root) => {
            return new Promise((resolve, object) =>
            {
                Clientes.countDocuments({}, (error, count) => {
                    if(error) rejects(error)
                    else resolve(count)
                });
            });
        },
        getProductos : (root, {limit, offset, stock}) =>
        {
            let filtro;
            if(stock){
                filtro = { stock: {$gt: 0} }
            }
            return Productos.find(filtro).limit(limit).skip(offset);
        },
        getProducto : (root, {id}) => {
            return new Promise((resolve, object)=>{
                Productos.findById(id, (error, producto) =>{
                    if(error) rejects(error)
                    else resolve(producto)
                })
            })
        },
        totalProductos : (root) =>{
            return new Promise((resolve, object) =>{
                Productos.countDocuments({}, (error, count) =>{
                    if(error) rejects(error)
                    else resolve(count)
                })
            })
        },
        getPedidos : (root, {cliente}) =>{
            return new Promise((resolve, object)=>{
                Pedidos.find({cliente : cliente}, (error, pedido) =>{
                    if(error) rejects(error)
                    else resolve(pedido)
                });
            })
        },
        TopClientes : (root) => {
            return new Promise((resolve, object)=>{
                Pedidos.aggregate([
                    {
                        $match: {
                            estado: 'COMPLETADO'
                        }
                    },
                    {
                        $group: {
                          _id: "$cliente",
                          total: {$sum : "$total"}  
                        }
                    },
                    {
                        $lookup: {
                            from: "clientes",
                            localField: '_id',
                            foreignField: '_id',
                            as: 'cliente'
                        }
                    },
                    {
                        $sort: { total: -1 } 
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error)
                    else resolve(resultado)
                })
            })
        }
    },
    Mutation:
    {
        crearCliente : (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos,
                emails : input.emails
            });
            nuevoCliente.id = nuevoCliente._id;
            return new Promise((resolve, object) =>
            {
                nuevoCliente.save((error) =>
                {
                    if(error) rejects(error)
                    else resolve(nuevoCliente);    
                });
            });

        },
        updateCliente : (root, {input}) =>{
            return new Promise((resolve, object) =>
            {
                Clientes.findOneAndUpdate({_id : input.id}, input, {new: true}, (error, cliente) =>
                {
                    if(error) rejects(error)
                    else resolve (cliente)
                });
            });
        },
        deleteCliente : (root, {id}) => 
        {
            return new Promise((resolve, object) =>
            {
                Clientes.findOneAndRemove({_id:id}, (error) =>
                {
                    if(error) rejects(error)
                    else resolve("Se eliminó correctamente")
                });
            });
        },
        crearProducto : (root, {input}) =>
        {   
            const crearProducto = new Productos({
                nombre : input.nombre,
                precio : input.precio,
                stock : input.stock
            });
            //MongoDB asigna el objeto
            crearProducto.id = crearProducto._id;
            return new Promise((resolve, object) =>
            {
                crearProducto.save((error) =>
                {
                    if (error) rejects(error)
                    else resolve(crearProducto)
                });
            });
        },
        updateProducto : (root, {input}) =>
        {
            return new Promise((resolve, object) =>
            {
                Productos.findOneAndUpdate({_id : input.id}, input, {new: true}, (error, producto) =>
                {
                    if(error ) rejects(error)
                    else resolve(producto)
                })
            });
        },
        deleteProducto : (root, {id}) =>
        {
            return new Promise((resolve, object) =>
            {
                Productos.findOneAndRemove({_id:id}, (error) =>
                {
                    if(error) rejects(error)
                    else resolve("Se eliminó correctamente")
                });
            });
        },
        nuevoPedido : (root, {input}) =>{
            const nuevoPedido = new Pedidos({
                pedido : input.pedido,
                total : input.total,
                fecha : new Date(),
                cliente : input.cliente,
                estado : "PENDIENTE"
            })
            //id by MongoDB
            nuevoPedido.id = nuevoPedido._id;
            return new Promise((resolve, object) =>{
                
                nuevoPedido.save((error) =>{
                    if(error) rejects(error)
                    else resolve(nuevoPedido)
                });
            });
        },
        updatePedido : (root, {input}) =>{
            //Recorrer y actualizar la cantidad de productos en base al estado del pedido
            const {estado} = input;

            let instruccion;
            if(estado === 'COMPLETADO')
            {
                instruccion = '-';
            }else if (estado=== 'CANCELADO')
            {
                instruccion = '+';
            }

            input.pedido.forEach(pedido =>{
                Productos.updateOne({_id:pedido.id}, 
                    {
                        "$inc": {"stock":`${instruccion}${pedido.cantidad}`}
                    }, function (error) {
                        if(error) return new Error(error);
                    }
                )
            })
            return new Promise((resolve, object) =>{
                Pedidos.findOneAndUpdate({_id : input.id}, input, {new: true}, (error)=>{
                    if(error) rejects(error)
                    else resolve("Se actualizó correctamente")
                })
            })
        },
        deletePedido : (root, {id}) =>{
            return new Promise((resolve, object)=>{
                Pedidos.findOneAndRemove({_id : id}, (error)=>{
                    if(error) rejects(error)
                    else resolve("Se eliminó correctamente")
                })
            })
        }
    }
}
export {resolvers};