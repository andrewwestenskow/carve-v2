module.exports = (userObj) => ({
  name: userObj.display_name,
  image: userObj.images[0].url,
  email: userObj.email,
})
