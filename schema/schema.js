const graphql = require('graphql');
const lash = require('lodash');

const Book = require('../models/books');
const Author = require('../models/authors');

const { GraphQLObjectType, 
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList
} = graphql;

// var books = [
//     { name: 'C++ for Beginners', genre: 'Programming', id: '1', authorId: '1'},
//     { name: 'It all started with a friend request', genre: 'Love', id: '2', authorId: '2'},
//     { name: 'That\'s the way we met', genre: 'Love', id: '3',authorId: '2'},
//     { name: 'Few things left unsaid', genre: 'Love', id: '4', authorId: '2'},
//     { name: 'Java Programming', genre: 'Programming', id: '5', authorId: '3'},
//     { name: 'Data Structures and Algorithms', genre: 'Programming', id: '6', authorId: '3'}
// ];

// var authors = [
//     { name: 'Dennis Richie', age: 70, id:'1'},
//     { name: 'Sudeep Nagarkar', age: 45, id:'2'},
//     { name: 'James Gosling', age: 50, id:'3'}
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        genre: { type:GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent,args){
                //return lash.find(authors, { id: parent.authorId});
                return Author.findById(parent.authorId); 
            }
        } 
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        age: { type:GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return lash.filter(books, { authorId: parent.id});
                return Book.find({ authorId: parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { 
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent,args){
                //code to get data from database/other sources
                //return lash.find(books, {id : args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent,args){
                //return lash.find(authors, {id: args.id});
                return Author.findById(args.id);
            }         
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
                }
            },
            resolve(parent,args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: GraphQLString
                },
                genre: {
                    type: GraphQLString
                },
                authorId: {
                    type: GraphQLID
                }
            },
            resolve(parent,args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});