const { ApolloServer } = require("apollo-server");

const graphql = require("graphql-tag");
const mongoose = require("mongoose");

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

mongoose
  .connect("mongodb+srv://user_rw:Qwerty%4099@freemongocluster.dkqgp.mongodb.net/merng?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    return server.listen({ port: 5001 });
  })
  .then((result) => {
    console.log(`server started at ${result.url}`);
  });
