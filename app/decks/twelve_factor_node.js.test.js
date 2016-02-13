var request = require('../request')
var testUtils = require('app/testUtils')

describe('the Twelve-Factor node.js slide deck', function () {
  var $ = null
  before(function (done) {
    request.loadPage('/twelve_factor_nodejs', function (error, dom) {
      $ = dom
      done(error)
    })
  })

  it('should be a slide deck', function () {
    testUtils.assertDeck($)
  })

  it('should mention some relevant words', function () {
    testUtils.assertSubstrings($, 'bole', 'systemd', 'config3')
  })
})
