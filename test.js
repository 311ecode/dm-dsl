const assert = require('assert');

const dm= require('./')

describe('a', () => {

  it('t', () => {
    dm.name('Route').asRoot()
  })

  it('throws, tests adding double root', ()=>{
    assert.throws(()=>{
      dm.name('root').asRoot
      dm.name('root2').asRoot();
    })
  })

  it('throws, has no root', ()=>{
    assert.throws(()=>{
      dm.name('root')
      dm.name('root2')();
    })
  })

  it('throws, tests adding same name model', ()=>{
    assert.throws(()=>{
      dm.name('root').asRoot
      dm.name('root')();
    })
  })

  it('templates', ()=>{
    dm.name('root').asRoot.template({a:'b' })()
  })

  it('memberOf throws no parent', ()=>{
    assert.throws(()=>{
      dm.name('root').asRoot.template({a:'b' })
      .name('child').memberOf('reet')()
    })
  })

  describe('basic memer tests', () => {
    const res = dm.name('root').asRoot.template({a:'b' })
    .name('child').memberOf('root').path('c').template({d:'e'})()

    it('rootData', ()=>{  
      const resultingData = res()
      assert.deepEqual(resultingData,{a:'b'})
    })

    it('memberOf ', ()=>{  
      const resultingData = res.set.child()  
      assert.deepEqual(resultingData,{a:'b',c:{d:'e'}})
    })

    it('memberOf 2X', ()=>{  
      const res = dm.name('root').asRoot.template({a:'b' })
      .name('child').memberOf('root').path('c').template({d:'e'})
      .name('child2').memberOf('root').path('f').template({g:'h'})
      ()

      const resultingData = res.set.child2.set.child()  
   
      assert.deepEqual(resultingData,{a:'b',c:{d:'e'},f:{g:'h'}})
    })

    it('memberOf 3X', ()=>{  
      const res = dm.name('root').asRoot.template({a:'b' })
      .name('child').memberOf('root').path('c').template({d:'e'})
      .name('child2').memberOf('root').path('f').template({g:'h'})
      .name('child3').memberOf('child2').path('i').template({j:'k'})
      ()

      const resultingData = res.set.child2.set.child3.set.child()  
   
      assert.deepEqual(resultingData,{a:'b',c:{d:'e'},f:{g:'h'},i:{j:'k'}})
    })

    it('membersOf', ()=>{  
      const res = dm.name('root').asRoot.template({a:'b' })
      .name('child').membersOf('root').path('c').template({d:'e'})
      ()

      const resultingData = res.add.child()  
   
      assert.deepEqual(resultingData,{a:'b',c:[{d:'e'}]})
    })

    
  })


})
