
const { dslFramework } = require('dsl-framework')
const processNames = require('./lib/processNames')
module.exports = dslFramework()((e, data) => {
  // console.log(Object.keys(data));
  let result = undefined
  data.command.has('name',

  ()=>{
    result=processNames(data)
  },

  ()=>{
    console.log('Please define a name command');
  })
  
  return result
  
})

