import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../querys';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
const dato = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
const Clientes = () => {
    return ( 
        <Fragment>
            <div className="row justify-content-center">
            <Query query={TOP_CLIENTES}>
                {({loading, error, data})=>{
                    if(loading) return "Cargando";
                    if(error) return `Error: ${error.message}`;
                    console.log(data.TopClientes)
                    const TopClientesGP = [];
                    data.TopClientes.map((pedido, index)=>{
                        TopClientesGP[index] = {
                            ...pedido.cliente[0],
                            total: pedido.total
                        }
                    });
                    console.log(TopClientesGP)
                    return (
                        <BarChart width={900} height={450} data={TopClientesGP}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                   <CartesianGrid strokeDasharray="3 3"/>
                   <XAxis dataKey="nombre"/>
                   <YAxis/>
                   <Tooltip/>
                   <Bar dataKey="total" fill="#1A1A1A" />
                  </BarChart>
                    )
                }}
            </Query>
            </div>
        </Fragment>
    );
}
 
export default Clientes;