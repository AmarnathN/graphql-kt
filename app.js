const { ApolloServer } = require("apollo-server");
const graphql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("./models/Post");

const typeDefs = graphql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }

  type Query {
    sayHi: String!
    getPosts: [Post]
  }
  type Mutation {
    sayHiTo(name: String!): String!
    createPost(body: String!): Post!
  }
`;

const resolvers = {
  Query: {
    sayHi: async () => "Hello",
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    //parent, args, context, info
    sayHiTo: (_, { name }) => {
      return `hi ${name}`;
    },
    createPost: async (_, { body }, context, info) => {
      const newPost = new Post({
        body,
        username: "Custom Username",
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      return post;
    },
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
