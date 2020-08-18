const { ApolloServer } = require("apollo-server");

const graphql = require("graphql-tag");

const typeDefs = graphql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello",
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5001 }).then((result) => {
  console.log(`server started at ${result.url}`);
});
