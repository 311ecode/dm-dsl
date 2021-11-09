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

  describe('full tests', () => {
    const res = dm.name('root').asRoot.template({a:'b' })
    .name('child').memberOf('root').path('c').template({d:'e'})()

    it('rootData', ()=>{  
      const resultingData = res()
      assert.deepEqual(resultingData,{a:'b'})
    })

    it('memberOf ', ()=>{  
      const resultingData = res.add.child()  
      assert.deepEqual(resultingData,{a:'b'})
    })
  })


})
