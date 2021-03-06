var express = require('express')

var router = new express.Router()
router.get(/error(\d+)/, function (req, res) {
  var code = parseInt(req.params[0], 10)
  res.status(code)
  if (code > 499) {
    res.render('errors/error500')
  } else {
    res.render('errors/error404')
  }
})

module.exports = router
