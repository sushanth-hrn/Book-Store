const graphql = require('graphql');
const lash = require('lodash');

const { GraphQLObjectType, 
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt
} = graphql;

var books = [
    { name: 'C++ for Beginners', genre: 'Programming', id: '1', authorId: '1'},
    { name: 'It all started with a friend request', genre: 'Love', id: '2', authorId: '2'},
    { name: 'Java Programming', genre: 'Programming', id: '3', authorId: '3'}
];

var authors = [
    { name: 'Dennis Richie', age: 70, id:'1'},
    { name: 'Sudeep Nagarkar', age: 45, id:'2'},
    { name: 'James Gosling', age: 50, id:'3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        genre: { type:GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent,args){
                console.log(parent);
                return lash.find(authors, { id: parent.authorId});
            }
        } 
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        age: { type:GraphQLInt }
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
                return lash.find(books, {id : args.id});
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
                return lash.find(authors, {id: args.id});
            }         
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});