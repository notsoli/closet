const fs = require('fs')
const path = require('path')
const jimp = require('jimp')

// determine source folder
const source = path.join(__dirname, '../../data/images/')

async function uploadImage(ctx, id) {
  const file = ctx.request.files.image

  // concatenate temp file path
  const temp = path.join(source, 'temp', `${id}.${file.type.split('/')[1]}`)

  // set up file read/write
  const reader = fs.createReadStream(file.path)
  const stream = fs.createWriteStream(temp)
  
  // transfer file
  await new Promise(resolve => 
    reader.pipe(stream).on('finish', resolve))

  // read image from temp
  const image = await jimp.read(temp)

  // create full image
  image.write(path.join(source, 'full', id + '.jpg'))

  // create preview image
  image.cover(144, 256)
  image.write(path.join(source, 'preview', id + '.jpg'))

  // delete temp image
  fs.unlinkSync(temp)
}

async function removeImage(ctx, id) {
  // remove images
  fs.unlinkSync(path.join(source, 'full', id + '.jpg'))
  fs.unlinkSync(path.join(source, 'preview', id + '.jpg'))
}

module.exports.uploadImage = uploadImage
module.exports.removeImage = removeImage