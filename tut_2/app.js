const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
    '/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
        }@cluster0.q3htb2a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`,
        {
            useNewUrlParser: true
        }
    )
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });