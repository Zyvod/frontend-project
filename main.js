const body = $('body');
const searchBar = $('#searchBar');
const searchBtn = $('#searchBtn');

function searchGames(gameData,userSearch) {
  $.get(`https://store.steampowered.com/api/storesearch/?term=${userSearch}&=english&cc=NL`, (data) => {
  for (var i = 0; i < data.items.length; i++) {
   gameData.push(data.items[i]);
  }
  console.log(gameData);
  populateResults(gameData);
 })
}
searchBtn.on('click', (event) => {
  let userSearch = '';
  let gameData = [];
  userSearch = searchBar.val();
  searchGames(gameData,userSearch);
})

body.on('keydown', (event) => {
  if ( event.originalEvent.key === 'Enter') {
    let userSearch = '';
    let gameData = [];
    userSearch = searchBar.val();
    searchGames(gameData,userSearch);
  }
})

function populateResults(gameData) {
   const searchResults = $('#searchResults')

   const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
   });

   searchResults.empty();

    gameData.forEach(function(game){

      const gameResult = $('<span>' , {
        class: 'game-result'
      });

      const gameDetails = $('<div>' , {
        class: 'game-details'
      });

      const gameTitle = $('<h3>' , {
        class: 'game-title',
        text: `${game.name}`
      });
      gameDetails.append(gameTitle);

      const gameImage = $('<img>' , {
        class: 'game-image',
        src: `${game.tiny_image}`
      });
      gameDetails.append(gameImage);

      const gameLinkContainer = $('<p>' , {
        class: 'link-container'
      })

      const gameLink = $('<a>' , {
        class: 'game-link',
        text: ` Purchase On Steam`,
        href: `https://store.steampowered.com/app/${game.id}`
      });
      gameLinkContainer.append(gameLink)
      gameDetails.append(gameLinkContainer);

      const metascore = $('<p>')
        if ( game.metascore === '' ) {
          metascore.html('<b>METASCORE:</b> N/A');
        } else {
          metascore.html(`<b>METASCORE:</b> ${game.metascore}`);
        }
        gameDetails.append(metascore);

      const operatingSystems = $('<p>')
      let sysString = '';
      $.each( game.platforms, ( key, value ) => {
        if (value) {
          sysString += `  ${key}`
        }
      });
      operatingSystems.html(`<b>OPERATING SYSTEMS:</b> ${sysString.toUpperCase()}`);
      gameDetails.append(operatingSystems);

      const price = $('<p>');
      if ( 'price' in game ) {
        price.html(`<b>PRICE:</b> ${formatter.format(game.price.final/100)}`);
      } else {
        price.html('<b>PRICE:</b> No Price Available');
      }
      gameDetails.append(price);

      gameResult.append(gameDetails);
      searchResults.append(gameResult);

    })
}

