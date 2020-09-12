const graphql = require('graphql');
const _ = require('lodash');

const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,//id tipi query den gelen parametreyinin değişken tipini gözetmez
    GraphQLList //dönen değer array olduğunda
} = graphql;


//Models

const Movie = require('./models/Movie.js');
const Director = require('./models/Director.js');

const MovieType = new GraphQLObjectType({
    name:'Movie',
    fields:()=>({
        id:{type:GraphQLID},
        title :{ type:GraphQLString},
        description:{type:GraphQLString},
        year:{type:GraphQLInt},
        director:{//bir filmin bir yönetmeni olabilir
            type:DirectorType,
            resolve(parent,args){
                return _.find(directors,{id:parent.directorId});
            }
        }
    })
}); 
const DirectorType = new GraphQLObjectType({
    name:'Director',
    fields:()=>({
        id:{type:GraphQLID},
        name :{ type:GraphQLString},
        birth:{type:GraphQLInt},
        movies:{// bir yönetmenin birden fazla filmi olabilir
            type: new GraphQLList(MovieType),
            resolve(parent,args){
                return _.filter(movies,{directorId:parent.id})
            }
        }
    })
}); 

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{//parametreye göre film
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(movies,{id:args.id});
            }
        },
        director:{
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(directors,{id:args.id});
            }
        },
        movies:{//tüm filmler
            type: new GraphQLList(MovieType),
            resolve(){
                return movies
            }
        }
        },
        directors:{
            type: new GraphQLList(DirectorType),
            resolve(){
                return directors
            }
        }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery
});
