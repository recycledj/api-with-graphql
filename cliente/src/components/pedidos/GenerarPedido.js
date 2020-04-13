import React from 'react';
import {Mutation} from 'react-apollo';
import {CREAR_PEDIDO} from '../../mutations';
import {withRouter} from 'react-router-dom';

const validarPedido = (props) =>
{
    let invalited = !props.productos || props.total === 0;
    return invalited;
}

const GenerarPedido = (props) => {
    return ( 
        <Mutation mutation={CREAR_PEDIDO}
            onCompleted={() => props.history.push('/clientes')}
        >
            {nuevoPedido => (
                <button
                    type="button"
                    className="btn btn-warning"
                    disabled={validarPedido(props)}
                    onClick={e =>{
                        const productosInput = props.productos.map(({nombre, precio, stock, ...objeto}) => objeto)
                        const input =
                        {
                            pedido : productosInput,
                            total : props.total,
                            cliente : props.idCliente
                        }
                        nuevoPedido({variables:{input}})
                    }}
                >
                    Generar pedido
                </button>
            )}
        </Mutation>
    );
}
 
export default withRouter(GenerarPedido);