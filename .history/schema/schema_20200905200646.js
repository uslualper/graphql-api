const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;


const movies = [
    { 
        id:1,
        title:'test',
        description:'açıklama',
        year: 1881
    },
    { 
        id:2,
        title:'test 2',
        description:'açıklama 2',
        year: 1882
    },
    { 
        id:3,
        title:'test 3',
        description:'açıklama 3',
        year: 1883
    }
];

const MovieType = new GraphQLObjectType({
    name:'Movie',
    fields:()=>({
        id:{type:GraphQLString},
        title :{ type:GraphQLString},
        description:{type:GraphQLString},
        year:{type:GraphQLInt} 
    })
}); 

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return _.find(movies,{id:args.id});
            }
        }
    }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery
});
