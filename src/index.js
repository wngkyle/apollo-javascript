const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { getUserId } = require('./util')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Movement = require('./resolvers/Movement')

const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Movement,
}

// typeDefs can be provided either directly as a string or by referencing a file that contains your schema definition 
// Instead of attaching an object directly, you are now creating the context as a function which returns the context
// This allows you to attach the HTTP request that carries the incoming GraphQL query (or mutation) to the context as well
// Allowing your resolvers to read the Authorization header and validate if the user who submitted the request is eligible 
// to perform the requested operation 
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
    .listen()
    .then(({ url }) => 
        console.log(` 🚀 Server is running on ${ url }`)
    )



// @hackernews-node
// $ node src/index.js
// $ npx prisma studio