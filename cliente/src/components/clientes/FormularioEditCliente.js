import React, { Component, Fragment } from 'react';
import {Mutation} from 'react-apollo';
import {UPDATE_CLIENTE} from '../../mutations';
import {withRouter} from 'react-router-dom';

class FormularioEditCliente extends Component {
    state = { 
        cliente: this.props.cliente,
        emails: this.props.cliente.emails,
        error: false
    }
    NuevoCampo = () =>
    {
        this.setState({
            emails: this.state.emails.concat([{email:''}])
        })
    }
    quitarCampo = i => () => {
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        });
    }
    leerCampo = i => e =>
    {
        const NuevoEmail = this.state.emails.map((email, index) =>{
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({emails: NuevoEmail});
    }
    render() { 
        const {nombre, apellido, empresa, edad, tipo} = this.state.cliente;
        const {error} = this.state;
        const respuesta = (error) ? <p className="alert alert-success">Cambios realizados con éxito.</p> : '';
        return ( 
            <Fragment>
                <Mutation mutation={UPDATE_CLIENTE}
                onCompleted={() => this.props.refetch().then(()=>{
                    this.props.history.push('/clientes')
                })}>
                {updateCliente =>(
                <div className="row justify-content-center" >
                    
                            <form className="col-md-8 mt-4"
                            onSubmit={e =>{
                                e.preventDefault();
                                const {id, nombre, apellido, empresa, edad, tipo} = this.state.cliente;
                                const {emails} = this.state;
                                const input = {
                                    id,
                                    nombre,
                                    apellido,
                                    empresa,
                                    edad:Number(edad),
                                    tipo,
                                    emails,
                                }
                                this.setState({error: true});
                                updateCliente({variables:{input}})
                            }}
                            >
                                {respuesta}
                                <div className="form-row">
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Nombre</label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="formGroupExampleInput" 
                                        placeholder="Nombre"
                                        defaultValue={nombre}
                                        onChange = {e =>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    nombre:e.target.value
                                                }
                                            })
                                        }}
                                        />
                                    </div>
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Apellido</label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="formGroupExampleInput2" 
                                        placeholder="Apellido"
                                        defaultValue={apellido}
                                        onChange={e =>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    apellido:e.target.value
                                                }
                                            })
                                        }}
                                        />
                                    </div>
                                    <div className="form-group font-weight-normal col-md-12">
                                        <label>Empresa</label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="formGroupExampleInput3" 
                                        placeholder="Empresa"
                                        defaultValue={empresa}
                                        onChange={e=>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    empresa:e.target.value
                                                }
                                            })
                                        }}
                                        />
                                    </div>
                                    {this.state.emails.map((input, index)=>(
                                      <div key={index} className="col-md-12 form-group">
                                          <label>Correo {index + 1}</label>
                                        <div className="input-group">
                                            <input
                                            onChange = {this.leerCampo(index)}
                                            type="email"
                                            className="form-control"
                                            placeholder="@"
                                            defaultValue={input.email}/>
                                            <div className="input-group-append">
                                                <button
                                                onClick={this.quitarCampo(index)}
                                                type="button"
                                                className="btn btn-danger">
                                                    &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                      </div>  
                                    ))}
                                    <div className="form-group">
                                        <button type="button" 
                                        className="btn btn-warning col-md-12"
                                        onClick={this.NuevoCampo}>
                                            Agregar E-mail
                                        </button>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Edad</label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="formGroupExampleInput5" 
                                        placeholder="Edad"
                                        defaultValue={edad}
                                        onChange={e =>
                                        {
                                            this.setState({
                                                cliente:
                                                {
                                                    ...this.state.cliente,
                                                    edad:e.target.value
                                                }
                                            })
                                        }}
                                        />
                                    </div>
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Tipo de cliente</label>
                                        <select className="form-control" placeholder="Elige una opción" defaultValue={tipo}
                                        onChange={e =>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    tipo:e.target.value
                                                }
                                            })
                                        }}
                                        >
                                            <option >Elige una opción</option>
                                            <option value="PREMIUM">Premium</option>
                                            <option value="BASICO">Básico</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <button type="submit" className="btn btn-success text-aling-center">Guardar</button>
                                </div>
                        </form>
                    </div>
                    )}
                    </Mutation>
            </Fragment>
        );
    }
}
export default withRouter(FormularioEditCliente);