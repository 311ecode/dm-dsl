const { dslFramework } = require('dsl-framework')

module.exports=(dslState)=>{

  const models = []
  let root = undefined
  const templates = {}
  const paths = {}
  const memberOf = {}
  const membersOf = {}

  const nameChunks = dslState.data.getSubcommand('name')()
  nameChunks.forEach(startsWithName => {
    const name = startsWithName.command.get('name')[0][1]
 
    if (models.includes(name)) 
      throw `We already have a model called ${name}`
    models.push(name)

    startsWithName.command.has('asRoot', ()=>{
      if(root) 
        throw "You already have a root";
      root = name
    })

    startsWithName.command.has('template', ()=>{
      templates[name]=startsWithName.arguments('template','firstArgument')
    })
    startsWithName.command.has('path', ()=>{
      const path = startsWithName.command.get('path')[0][1]
      paths[name] = path    
    })
  })

  if(!root) throw "There is no root";
  nameChunks.forEach(startsWithName => {
    const name = startsWithName.command.get('name')[0][1]
 
    startsWithName.command.has('memberOf', ()=>{
      const memberof = startsWithName.command.get('memberOf')[0][1]
      if(!models.includes(memberof))
        throw "You don't have a model called ${memberOf}";"'" 
      memberOf[name] = memberof      
    })

    startsWithName.command.has('membersOf', ()=>{
      const membersof = startsWithName.command.get('membersOf')[0][1]
      if(!models.includes(membersof))
        throw "You don't have a model called ${membersOf}";"'" 
      membersOf[name] = membersof      
    })


  })

  return dslFramework()((e, builderData) => {
    const rootData = templates[root];
    builderData.command.has('add',()=>{
      const addChunks = builderData.data.getSubcommand('add')()
      addChunks.forEach(add =>{
        const nameOfChild = add.data.returnArrayChunks[1][0]
        models.includes(nameOfChild)
        &&
        (()=>{
          const path =paths[nameOfChild]
          const members = membersOf[nameOfChild]          
          const templateOfChild = templates[nameOfChild]
          if(members){
            if(!Array.isArray(rootData[path])){
              rootData[path]=[]
            }
            rootData[path].push(templateOfChild)            
          }
        })()
        // should throw here
        // models.includes(nameOfChild)
        // ||(()=>{
        //   console.log("WEEE",{models,nameOfChild});
        // })()


        // console.log("UUUU",add.data.returnArrayChunks[1][0])
      })
  
    })

    builderData.command.has('set',()=>{
      const setChunks = builderData.data.getSubcommand('set')()
      setChunks.forEach(add =>{
        const nameOfChild = add.data.returnArrayChunks[1][0]
        models.includes(nameOfChild)
        &&
        (()=>{
          const path =paths[nameOfChild]
          const member = memberOf[nameOfChild]
          const members = membersOf[nameOfChild]          
          const templateOfChild = templates[nameOfChild]
          if(member){
            rootData[path] = templateOfChild
          }
          if(members){
            if(!Array.isArray(rootData[path])){
              rootData[path]=[]
            }
            rootData[path].push(templateOfChild)            
          }

        })()


        // should throw here
        // models.includes(nameOfChild)
        // ||(()=>{
        //   console.log("WEEE",{models,nameOfChild});
        // })()


        // console.log("UUUU",add.data.returnArrayChunks[1][0])
      })
  
    })    


    return rootData
  })
 
}