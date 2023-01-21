const formatText = (str) => {
 const re = /[\[\]]/g;
 str = str.replaceAll(re, "")
 return str
}

const formatList = (list) => {
 list = list.map(obj => ({
  definition: formatText(obj.definition),
  example: formatText(obj.example)
 }))
 return list
}

module.exports = { formatList }
