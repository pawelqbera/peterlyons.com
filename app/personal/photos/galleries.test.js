var expect = require('chaimel')
var galleries = require('./galleries')

var mockPhotoJSON = JSON.stringify([
  {
    name: 'test-photo-name'
  }
])

var gallery = {
  dirName: 'testGallery'
}

describe('app/photos/galleries', function () {
  it('photoJSONToObject should parse and format JSON', function () {
    var photos = galleries.photoJSONToObject(gallery, mockPhotoJSON)
    expect(photos.length).toEqual(1)
    expect(photos[0].fullSizeURI)
      .toEqual('/photos/testGallery/test-photo-name.jpg')
    expect(
      photos[0].thumbnailURI).toEqual(
      '/photos/testGallery/test-photo-name-TN.jpg')
    expect(photos[0].pageURI).toEqual(
      '/app/photos?gallery=testGallery&photo=test-photo-name')
  })
})
