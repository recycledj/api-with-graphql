import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
mutation crearCliente ($input: ClienteInput ) {
    crearCliente(input: $input)
    {
        id
        nombre
        apellido
    }
}`;

export const UPDATE_CLIENTE = gql`
mutation updateCliente($input: ClienteInput)
{
  updateCliente(input: $input) {
    id
    nombre
    apellido
    empresa
    edad
    emails
    {
      email
    }
    tipo
  }
}`;

export const DELETE_CLIENTE = gql`mutation eliminarCliente($id: ID!){
  deleteCliente(id: $id)
}`;

export const CREAR_PRODUCTO = gql`
mutation crearProducto($input: ProductoInput)
{
  crearProducto(input: $input){
    id
    nombre
    precio
    stock
  }
}
`;

export const DELETE_PRODUCTO = gql`mutation deleteProducto($id: ID!) {
  deleteProducto(id: $id)
}
`;

export const UPDATE_PRODUCTO = gql`mutation updateProducto ($input: ProductoInput)
{
  updateProducto(input: $input)
  {
    id
    nombre
    precio
    stock
  }
}`;
//PEDIDOS
export const CREAR_PEDIDO = gql`mutation nuevoPedido($input: PedidosInput)
{
  nuevoPedido(input: $input)
  {
    id
    fecha
    total
    pedido {
      id
      cantidad
    }
  }
}`;

export const UPDATE_PEDIDO = gql`mutation updatePedido($input: PedidosInput)
{
  updatePedido(input: $input)
}`;