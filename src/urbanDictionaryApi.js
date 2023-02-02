require('dotenv').config()
const axios = require("axios");
const { formatList } = require("./helpers/responseFormatter")

let options = (term) => ({
  method: 'GET',
  url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
  params: {term},
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
  } 
})

const meaning = async (term) => {
 try {
  let response = await axios.request(options(term))
  return response.data.list.length ? formatList(response.data.list) : 0
 } catch(e) {
  console.error(e);
 }
} 

module.exports = { meaning }


