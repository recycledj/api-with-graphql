import React, {  Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../querys';

const DatosCliente = ({id}) => {
    return ( 
        <Fragment>
            <h4 className="text-center mb-4">Resumen del cliente</h4>
            <Query query={CLIENTE_QUERY} variables={{id}} pollInterval={500}>
            {({loading, error, data, startIntervall, stopIntervall}) =>{
                if(loading) return "Cargando...";
                if(error) return `Error: ${error.message}`;
                const {id, nombre, apellido, empresa, edad, emails, tipo} = data.getCliente;
                return(
                    <ul className="list-unstyled my-5" key={id}>
                        <li className="border font-weight-bold p-2">Nombre: <span className="font-weight-normal">{nombre}</span></li>
                        <li className="border font-weight-bold p-2">Apellido: <span className="font-weight-normal">{apellido}</span></li>
                        <li className="border font-weight-bold p-2">Empresa: <span className="font-weight-normal">{empresa}</span></li>
                        <li className="border font-weight-bold p-2">Edad: <span className="font-weight-normal">{edad}</span></li>
                        <li className="border font-weight-bold p-2">Tipo de cliente: <span className="font-weight-normal">{tipo}</span></li>
                        <li className="border font-weight-bold p-2">Emails: {emails.map(item => 
                        <span key={item.email} className="font-weight-normal">{item.email} </span>)}
                        </li>
                    </ul>
                );
            }}
            </Query>
        </Fragment>
    );
}
 
export default DatosCliente;