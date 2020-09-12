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
const Movie = require('../models/Movie');
const Director = require('../models/Director');

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
                return _.find(Director,{id:parent.directorId});
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
                return _.filter(Movie,{directorId:parent.id})
            }
        }
    })
}); 
//veri çekme
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{//parametreye göre film
            type:MovieType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(Movie,{id:args.id});
            }
        },
        director:{
            type:DirectorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(Director,{id:args.id});
            }
        },
        movies:{//tüm filmler
            type: new GraphQLList(MovieType),
            resolve(){
                return Movie
            }
        }
        },
        directors:{
            type: new GraphQLList(DirectorType),
            resolve(){
                return Director
            }
        }
}); 
//veri ekleme
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addMovie: {
            type: MovieType,
            args:{
                title:{type:GraphQLString },
                description:{type:GraphQLString},
                year:{type:GraphQLInt},
                directorId:{type:GraphQLString}
            },
            resolve(parent,args){
                const movie = new Movie({
                    title:args.title,
                    description:args.description,
                    year:args.year,
                    directorId:args.directorId
                }); 
                return movie.save();
            }
        }
    }
}); 

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
