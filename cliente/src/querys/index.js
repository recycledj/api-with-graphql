import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
query getClientes($limit: Int, $offset: Int)
  {
    getClientes(limit: $limit, offset: $offset)
    {
      id
      nombre
      apellido
      empresa
      edad
      emails {
        email
      }
      tipo
    }
    totalClientes
  }`;
export const CLIENTE_QUERY = gql`
query ConsultarCliente($id:ID)
{
  getCliente(id: $id)
  {
    id
    nombre
    apellido
    empresa
    edad
    tipo
    emails
    {
        email
    }
  }
}`; 

export const PRODUCTOS_QUERY = gql`
query getProductos($limit: Int, $offset: Int, $stock: Boolean)
{
  getProductos(limit: $limit, offset: $offset, stock: $stock)
  {
    id
    nombre
    precio
    stock
  }
  totalProductos
}
`;
export const PRODUCTO_QUERY = gql`query getProducto ($id: ID)
{
  getProducto(id: $id)
  {
    id
    nombre
    precio
    stock
  }
}`;

export const OBTENER_PEDIDOS = gql`query getPedidos($cliente: String)
{
  getPedidos(cliente: $cliente)
  {
    id
    fecha
    pedido
    {
      id
      cantidad
    }
    cliente
    estado
    total
  }
}`;

export const TOP_CLIENTES = gql`query
{
  TopClientes
  {
    total
    cliente {
      nombre
      apellido
    }
  }
}`;