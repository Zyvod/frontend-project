const body = $('body')
const searchBar = $('#searchBar')
const searchBtn = $('#searchBtn')

function searchGames(gameData,userSearch) {
  $.get(`https://store.steampowered.com/api/storesearch/?term=${userSearch}&=english&cc=NL`, (data) => {
  for (var i = 0; i < data.items.length; i++) {
   gameData.push(data.items[i])
  }
  console.log(gameData)
  populateResults(gameData)
 })
}
searchBtn.on('click', (event) => {
  let userSearch = ''
  let gameData = []
  userSearch = searchBar.val()
  searchGames(gameData,userSearch);
})

function populateResults(gameData) {
  const searchResults = document.getElementById('searchResults');

  while (searchResults.firstChild) {
    searchResults.removeChild(searchResults.firstChild);
  }

    for (let i = 0; i < gameData.length; i++) {
      const gameResult = document.createElement('span');
      gameResult.classList.add('game-result');

      const gameTitle = document.createElement('h3');
      gameTitle.classList.add('game-title');
      gameTitle.textContent = gameData[i].name;
      gameResult.appendChild(gameTitle);

      const gameImage = document.createElement('img');
      gameImage.classList.add('game-image');
      gameImage.src = gameData[i].tiny_image;
      gameResult.appendChild(gameImage);

      // const gameType = document.createElement('h2');
      // gameType.classList.add('game-type');
      // gameType.textContent = gameData[i].type;
      // gameResult.appendChild(gameType);

      const gameDetails = document.createElement('div');
      gameDetails.classList.add('game-details');

      const metascore = document.createElement('p');
      metascore.innerHTML = `<b>METASCORE:</b> ${gameData[i].metascore}`;
      gameDetails.appendChild(metascore);

      const operatingSystems = document.createElement('p');
      operatingSystems.innerHTML = `<b>OPERATING SYSTEMS:</b> ${gameData[i].platforms}`;
      gameDetails.appendChild(operatingSystems);

      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });

      if ( gameData[i].price === undefined ) {
       continue
      } else {
      const price = document.createElement('p');
      price.innerHTML = `<b>PRICE:</b> ${formatter.format(gameData[i].price.final/100)}`;
      gameDetails.appendChild(price);
      }

      gameResult.appendChild(gameDetails);
      searchResults.appendChild(gameResult);
    }
 }

//What data do we get from each search?

// each item contains the following keys [ id,metascore,name,platforms,price,stereamingvideo,tiny_image,type]

// the key platforms contains the keys [linux,mac,windows]
// the key price contains the keys [ currency,final,initial]
