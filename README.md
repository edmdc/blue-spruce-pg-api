# Blue Spruce Plant Guide API

The [original project](https://github.com/edmdc89-turing-student-projects/blue-spruce-plant-guide)
can be found under the [organization](https://github.com/edmdc89-turing-student-projects)
for my projects as a student at [Turing School of Software and Design](https://turing.io/).
I recreated this front-end project as a full-stack application demonstrate the
technologies and concepts explored in the weeks following my graduation from
Turing. The front-end repository can be found [here](https://github.com/edmdc89/blue-spruce-plant-guide-v2).

## Abstract

I built this learning tool to explore native plants in Colorado. On the back-end,
it's a GraphQL server that brings together Trefle, [the plant API](https://trefle.io/),
with a MongoDB database to track users and quizzes taken.

I believe the better we know our tools as craftspeople, the better software we
can create. With that in mind, I extended this previous front-end project into
a full-stack application to explore the tools available and best practices around
creating modern web API.

### Set Up

Clone down repository to local machine and run:

```zsh
yarn install
```

A Trefle api key and MongoDb Atlas cluster is required to make this project run.

- Create a <a href='https://trefle.io/' target='_blank'>Trefle</a> account for an
api key
- Follow <a href='https://docs.atlas.mongodb.com/getting-started/' target='_blank'>these instructions</a>
to add a MongoDB Cluster to project

Once acquired, add them to a `.env` using the variable names outlined on `.sample.env`.

Then run the following command to start project in development mode:

```zsh
yarn serve
```

Or, if a production build is desired run the following commands:

```zsh
yarn build && yarn start
```

### Concepts & Tools

#### GraphQL

GraphQL is a query language for APIs and server-side runtime to fulfill those
queries. At a high level, it merges traditional RESTful API endpoints, which
expose a single resource at a time, into a single endpoint that reveals an API's
schema. A schema is a type system created and enforced by GraphQL to describe
a service's data and the functions to obtain it.

By using GraphQL, front- and back-end teams can talk about the data required to
meet business needs independent of programming languages/frameworks and focus
on relationships and naming conventions, ultimately creating more intuitive API.

#### NoSQL vs SQL

The relational model behind SQL databases has its roots in the 1970s, a different
time for computer processing power and cost of data storage, a time which required
extensive planning to fit data and data relationships into neat tables to avoid
duplication and improve query efficiency. These foundations make SQL databases
depend on less processing power and return more accurate results than their NoSQL
counterparts, remaining a relevant, sensible choice in modern times.

NoSQL databases are any database that stores data in a format other than relational
tables. NoSQL databases first appeared in the late 2000s as the cost of data
storage saw a sharp decrease, and the needs of modern applications began to change.
NoSQL emerged to solve SQL databases' most pressing problems: scalability and lack
of schema flexibility. NoSQL allows developers to iterate over their database
model with minimal downtime and adapt to changing requirements by continuously
and incrementally meeting scalability demands.

This project is small, so database choice is inconsequential. I choose to work
with a MongoDB (NoSQL) over a SQL database because I had no experience with it,
whereas, during my time at Turing, I worked on a full-stack team creating and
consuming a PostgresSQL database.

### Schema

```graphql
directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

"""
A field whose value conforms to the standard internet email address format as
specified in RFC822: https://www.w3.org/Protocols/rfc822/.
"""
scalar EmailAddress

"""
A field whose value conforms to the standard URL format as specified in RFC3986:
https://www.ietf.org/rfc/rfc3986.txt.
"""
scalar URL

type Plant {
  id: Int!
  commonName: String
  scientificName: String
  imageUrl: URL
  familyCommonName: String
  familyScientificName: String
}

type Token {
  token: String
  expiration: String
}

type User {
  _id: String!
  favorites: [Plant]
  name: String
  email: EmailAddress
  password: String
  token: Token
}

type AnswerChoice {
  answerID: Int
  choices: [Plant]
}

type Query {
  plantCatalog(page: Int, zone: String): [Plant]
  randomPlantCatalog: [Plant]
  plantQuiz: [AnswerChoice]
}

type Mutation {
  userLogIn(email: EmailAddress!, password: String!): User
  userSignUp(name: String!, email: EmailAddress!, password: String!): User
}

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

"""The `Upload` scalar type represents a file upload."""
scalar Upload

```
