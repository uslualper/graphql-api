const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID//id tipi query den gelen parametreyinin değişken tipini gözetmez
} = graphql;


const movies = [
    { 
        id:'1',
        title:'test',
        description:'açıklama',
        year: 1881,
        directorId:'1'
    },
    { 
        id:'2',
        title:'test 2',
        description:'açıklama 2',
        year: 1882,
        directorId:'1'
    },
    { 
        id:'3',
        title:'test 3',
        description:'açıklama 3',
        year: 1883,
        directorId:'2'
    }
];

const director = [
    {
        id: '1',
        name : 'Alper Uslu',
        birth: 1995
    },
    {
        id: '2',
        name : 'Yunus Emre',
        birth: 1995
    }
]

const MovieType = new GraphQLObjectType({
    name:'Movie',
    fields:()=>({
        id:{type:GraphQLID},
        title :{ type:GraphQLString},
        description:{type:GraphQLString},
        year:{type:GraphQLInt},
        director:{
            type:DirectorType,
            resolve(parent,args){
                return _.find(director,{id:parent.directorId});
            }
        }
    })
}); 
const DirectorType = new GraphQLObjectType({
    name:'Director',
    fields:()=>({
        id:{type:GraphQLID},
        name :{ type:GraphQLString},
        birth:{type:GraphQLInt}
    })
}); 

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(movies,{id:args.id});
            }
        }
    }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery
});
