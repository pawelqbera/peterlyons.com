var request = require('../request')
var expect = require('chaimel')
var testUtils = require('../test-utils')

describe('the Leveling Up article', function () {
  var $ = null
  before(function (done) {
    request.loadPage('/leveling-up', function (error, dom) {
      $ = dom
      done(error)
    })
  })

  it('should have the proper content', function () {
    testUtils.assertSelectors($, '#pillar1', '#pillar2', '#pillar3')
    testUtils.assertSubstrings($, 'operating system', 'thousands')
  })

  it('should have the proper title', function () {
    expect($('title').text()).toMatch(/Leveling Up/)
  })
})
