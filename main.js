const body = $('body')
const searchBar = $('#searchBar')
const searchBtn = $('#searchBtn')
let gameData = []
let userSearch = ''

function searchGames() {
  $.get(`https://store.steampowered.com/api/storesearch/?term=${userSearch}&=english&cc=NL`, (data) => {
  for (var i = 0; i < data.items.length; i++) {
   gameData.push(data.items[i])
  }
  console.log(gameData)
 })
}

searchBtn.on('click', (event) => {
  gameData = []
  console.log('working')
  userSearch = searchBar.val()
  searchGames();
  console.log(userSearch)
})

//What data do we get from each search?

// each item contains the following keys [ id,metascore,name,platforms,price,stereamingvideo,tiny_image,type]

// the key platforms contains the keys [linux,mac,windows]
// the key price contains the keys [ currency,final,initial]
