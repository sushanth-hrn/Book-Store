const graphql = require('graphql');
const lash = require('lodash');

const { GraphQLObjectType, 
        GraphQLString,
        GraphQLSchema,
        GraphQLID
} = graphql;

var books = [
    { name: 'C++ for Beginners', genre: 'Programming', id: '1'},
    { name: 'It all started with a friend request', genre: 'Love', id: '2'},
    { name: 'Java Programming', genre: 'Programming', id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type:GraphQLID },
        name: { type:GraphQLString },
        genre: { type:GraphQLString } 
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});