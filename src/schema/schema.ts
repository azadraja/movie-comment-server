

export const typeDefs = `
  scalar JSON

  type Movie {
    id: ID!
    title: String!
    poster_path: String!
    backdrop_path: String!
    vote_average: Float!
    overview: String!
    credits: Credits
  }
  
  type Credits {
    id: ID!
    cast: [Cast!]!
    crew: [Crew!]!
  }

  type Cast {
    character: String!
    credit_id: Int!
    name: String!
    profile_path: String!
  }

  type Crew {
    job: String!
    name: String!
    credit_id: Int!
  }
  
  type PopularMovieResults {
    total_results: Int!
    total_pages: Int!
    page: Int!
    results: [Movie!]!
  }

  type Comment {
    id: ID
    movieId: Int
    content: JSON
    author: String
    createdAt: String
    updatedAt: String
    parentId: Int
    children: [Comment]
  }

  type User {
    id: ID
    email: String
    createdAt: String
    updatedAt: String
    token: String
  }

  type Query {
    comments(movieId: Int!): [Comment]!
    popularMovies(page: Int!): PopularMovieResults!
    getMovie(movieId: ID!): Movie!
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    createComment(movieId: Int!, content: JSON!, author: String!, parentId: Int): Comment!
    deleteComment(id: Int!): Comment!
    updateComment(id: Int!, movieId: Int!, content: JSON!, author: String!): Comment!
  }
`;
