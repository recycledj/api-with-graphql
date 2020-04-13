import React, { Component } from 'react'
class Paginador extends Component {
    state = { 
        paginador: 
        {
            paginas: Math.ceil(Number(this.props.totalProductos) / this.props.limit)
        }
     }
    render() { 
        const {actual} = this.props;
        const btnAnterior = (actual > 1) ? <button type="button" className="btn btn-success mr-2" onClick={this.props.PaginaAnterior}>&laquo; Anterior</button> : '';
        //Btn siguiente
        const paginas = this.state.paginador.paginas;
        const btnSiguiente = (actual !== paginas) ? <button type="button" className="btn btn-success mr-2" onClick={this.props.PaginaSiguiente}>Siguiente &raquo;</button> : '';
        return ( 
            <div className="mt-2 justify-content-center d-flex">
                {btnAnterior}{btnSiguiente}
            </div>
        );
    }
}
 
export default Paginador;