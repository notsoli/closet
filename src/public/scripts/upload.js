// wait until page is loaded
window.addEventListener('load', init)

// fill dom and add event listeners
function init() {
  // add button dom
  item = document.querySelector('#item')
  itemSection = document.querySelector('#item-section')

  // add button
  const addButton = document.querySelector('#add')
  addButton.addEventListener('click', addItem)

  // remove buttons
  const removeButtons = document.querySelectorAll('.remove')
  removeButtons.forEach(button => {
    button.addEventListener('click', removeItem)
  })

  // fill date dom
  dateInput = document.querySelector('#date')

  // listen for file upload
  const image = document.querySelector('#image')
  image.addEventListener('change', fillDate)
}

// add dom
let item, itemSection

// add item to list
function addItem() {
  // add if less than 10 items are present
  if (itemSection.children.length < 10) {
    // clone item and remove id
    const newItem = item.cloneNode(true)
    newItem.removeAttribute('id')

    // add event listener for remove button
    const removeButton = newItem.querySelector('.remove')
    removeButton.addEventListener('click', removeItem)

    // append new item to item section
    itemSection.appendChild(newItem)
  }
}

// remove item from list
function removeItem() {
  // determine item
  const item = this.parentElement

  // remove if more than 1 item is present
  if (itemSection.children.length > 2) {
    item.remove()
  }
}

// fill dom
let dateInput

// fill date with date last modified of uploaded image
function fillDate() {
  const file = this.files[0]
  const lastModified = new Date(file.lastModified)

  // format month
  let month = lastModified.getMonth() + 1
  month = (month > 9) ? month : '0' + month.toString()

  // format date
  let date = lastModified.getDate()
  date = (date > 9) ? date : '0' + date.toString()

  // set value of date input
  dateInput.value = `${lastModified.getFullYear()}-${month}-${date}`
}