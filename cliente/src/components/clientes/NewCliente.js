import React, { Component, Fragment } from 'react';
import {NUEVO_CLIENTE} from '../../mutations';
import {Mutation} from 'react-apollo';

class NewCliente extends Component {
    state = {
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            email: '',
            tipo: ''
        },
        error : false,
        emails:[]
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
        })
    }
    leerCampo = i => e =>
    {
        const NuevoEmail = this.state.emails.map((email, index) =>{
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        })
        this.setState({
            emails: NuevoEmail
        })
    }
    render() { 
        const {error} = this.state;
        let respuesta = (error) ? <p className="alert alert-danger">Todos los campos son obligatorios</p> : '';
        return ( 
            <Fragment>
                <h2 className="text-center mt-4">Crear nuevo cliente</h2>
                
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={NUEVO_CLIENTE}
                        onCompleted={() => this.props.history.push('/clientes')}>
                        {crearCliente => (
                            <form className="col-md-8 mt-4"
                                onSubmit={e =>{
                                    e.preventDefault();
                                    const {emails} = this.state;
                                    const {nombre, apellido, empresa, edad, tipo} = this.state.cliente;
                                    if(nombre==='' || apellido==='' || empresa===''|| edad==='' || tipo==='')
                                    {
                                        this.setState({
                                            error: true
                                        });
                                        return;
                                    }
                                    this.setState({
                                        error: false
                                    });
                                    const input = {
                                        nombre,
                                        apellido, 
                                        empresa,
                                        edad:Number(edad),
                                        emails,
                                        tipo
                                    }
                                    crearCliente({
                                        variables:{input}
                                    })
                                }}>
                                {respuesta}
                                <div className="form-row">
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Nombre</label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="formGroupExampleInput" 
                                        placeholder="Nombre"
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    nombre : e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Apellido</label>
                                        <input 
                                        type="text" 
                                        className="form-control" 
                                        id="formGroupExampleInput2" 
                                        placeholder="Apellido"
                                        onChange={e => {
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    apellido : e.target.value
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
                                        onChange = {e =>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    empresa : e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    {this.state.emails.map((input, index)=>(
                                      <div key={index} className="col-md-12 form-group">
                                          <label>Correo {index + 1}</label>
                                        <div className="input-group">
                                            <input
                                            onChange = {this.leerCampo(index)}
                                            type="email"
                                            className="form-control"
                                            placeholder="@"/>
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
                                        className="btn btn-warning"
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
                                        onChange={e =>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    edad: e.target.value
                                                }
                                            })
                                        }}/>
                                    </div>
                                    <div className="form-group font-weight-normal col-md-6">
                                        <label>Tipo de cliente</label>
                                        <select className="form-control" placeholder="Elige una opción"
                                        onChange={e =>{
                                            this.setState({
                                                cliente:{
                                                    ...this.state.cliente,
                                                    tipo:e.target.value
                                                }
                                            })
                                        }}>
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
                        ) }
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default NewCliente;