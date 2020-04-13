import express from 'express';
//GraphQL
import {ApolloServer} from 'apollo-server-express';
import {typeDefs} from './data/schema';
import {resolvers} from './data/resolvers';

const app = express(); 
const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});

app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => 
{
    console.log(`Aplicación corriendo en el puerto:${app.get('port')}, ${server.graphqlPath}`);
});

app.get('/', (req, res) => {
    res.send("Todo listo");
}); 