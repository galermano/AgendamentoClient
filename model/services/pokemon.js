// npm install axios  
const axios = require('axios');
function getPokemon(value) {
    return axios.get('https://pokeapi.co/api/v2/pokemon/'+value);
  }
  module.exports= {getPokemon};