import React, {Component, Fragment} from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
//import components
import Clientes from './components/clientes/Clientes';
import Header from './components/layout/Header';
import EditCliente from './components/clientes/EditCliente';
import NewCliente from './components/clientes/NewCliente';
import Productos from './components/productos/productos';
import NewProducto from './components/productos/NewProducto';
import EditProducto from './components/productos/EditProducto';
import NewPedido from './components/pedidos/NewPedido';
import PedidosCliente from './components/pedidos/PedidosCliente';
import Panel from './components/panel/panel';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) =>{
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component {
  render(){
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header/>
          <div className="container">
            <Switch>
              <Route exact path="/clientes" component={Clientes}/>
              <Route exact path="/cliente/nuevo" component={NewCliente}/>
              <Route exact path="/cliente/editar/:id" component={EditCliente}/>
              <Route exact path="/productos" component={Productos}/>
              <Route exact path="/productos/editar/:id" component={EditProducto}/>
              <Route exact path="/productos/nuevo" component={NewProducto}/>
              <Route exact path="/pedidos/nuevo/:id" component={NewPedido}/>
              <Route exact path="/pedidos/:id" component={PedidosCliente}/>
              <Route exact path="/panel" component={Panel}/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
  }
}

export default App;
