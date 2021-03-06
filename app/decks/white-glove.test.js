var request = require('../request')
var testUtils = require('../test-utils')

describe('the Finding Inconsistencies MongoDB slide deck', function () {
  var $ = null
  before(function (done) {
    request.loadPage('/white-glove', function (error, dom) {
      $ = dom
      done(error)
    })
  })

  it('should be a slide deck', function () {
    testUtils.assertDeck($)
  })

  it('should mention some relevant words', function () {
    testUtils.assertSubstrings(
      $, 'Schemaless', 'inconsistent', 'data', 'MongoDB')
  })
})
