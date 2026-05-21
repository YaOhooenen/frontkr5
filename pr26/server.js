import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const authors = [
  { id: '1', name: 'Лев Толстой' },
  { id: '2', name: 'Фёдор Достоевский' }
];

const books = [
  { id: '1', title: 'Война и мир', authorId: '1' },
  { id: '2', title: 'Анна Каренина', authorId: '1' },
  { id: '3', title: 'Преступление и наказание', authorId: '2' }
];

const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
  }

  type Mutation {
    createBook(title: String!, authorId: ID!): Book!
    createAuthor(name: String!): Author!
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(b => b.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find(a => a.id === id),
  },
  Mutation: {
    createBook: (_, { title, authorId }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        authorId
      };
      books.push(newBook);
      return newBook;
    },
    createAuthor: (_, { name }) => {
      const newAuthor = {
        id: String(authors.length + 1),
        name
      };
      authors.push(newAuthor);
      return newAuthor;
    }
  },
  Book: {
    author: (book) => authors.find(a => a.id === book.authorId)
  },
  Author: {
    books: (author) => books.filter(b => b.authorId === author.id)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 Сервер готов: ${url}`);