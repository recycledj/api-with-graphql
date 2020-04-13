import mongoose, { Schema, mongo } from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true});

//Definir schema clientes
const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String, 
    empresa: String,
    edad: String,
    tipo: String,
    pedidos: Array,
    emails: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);
const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number, 
});
const Productos = mongoose.model('productos', productosSchema);

const PedidosSchema = new Schema({
    pedido: Array,
    total: Number,
    fecha: Date,
    cliente: mongoose.Types.ObjectId,
    estado: String
});

const Pedidos = mongoose.model('pedidos', PedidosSchema);

export {Clientes, Productos, Pedidos};