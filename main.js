//What data do we get from each search?

// each item contains the following keys [ id,metascore,name,platforms,price,stereamingvideo,tiny_image,type]

// the key platforms contains the keys [linux,mac,windows]
// the key price contains the keys [ currency,final,initial]
//Discovered that we can append the id from search results to a partial link from steam in order to create a link to the game on our application

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
   const searchResults = $('#searchResults');
   // const searchResults = document.getElementById('searchResults');
   const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
   });

   searchResults.empty();
   // while (searchResults.firstChild)
    // searchResults.removeChild(searchResults.firstChild);


    gameData.forEach(function(game){

      const gameResult = $('<span>' , {
        class: 'game-result'
      });
      // const gameResult = document.createElement('span');
      // gameResult.classList.add('game-result');

      const gameTitle = $('<h3>' , {
        class: 'game-title',
        text: `${game.name}`
      });
      gameResult.append(gameTitle);
      // const gameTitle = document.createElement('h3');
      // gameTitle.classList.add('game-title');
      // gameTitle.textContent = game.name;
      // gameResult.appendChild(gameTitle);

      const gameImage = $('<img>' , {
        class: 'game-image',
        src: `${game.tiny_image}`
      });
      gameResult.append(gameImage);
      // const gameImage = document.createElement('img');
      // gameImage.classList.add('game-image');
      // gameImage.src = game.tiny_image;
      // gameResult.appendChild(gameImage);

      const gameLink = $('<a>' , {
        class: 'game-link',
        text: 'Link',
        href: `https://store.steampowered.com/app/${game.id}`
      });
      gameResult.append(gameLink);
      // const gameLink = document.createElement('a');
      // gameLink.classList.add('game-link');
      // gameLink.textContent = 'Link';
      // gameLink.setAttribute('href', `https://store.steampowered.com/app/${game.id}`) ;
      // gameResult.appendChild(gameLink);

      const gameDetails = $('<div>' , {
        class: 'game-details'
      });
      // const gameDetails = document.createElement('div');
      // gameDetails.classList.add('game-details');

      const metascore = $('<p>')
        if ( game.metascore === '' ) {
          metascore.html('<b>METASCORE:</b> N/A');
        } else {
          metascore.html(`<b>METASCORE:</b> ${game.metascore}`);
        }
        gameDetails.append(metascore);

      // const metascore = document.createElement('p');
      // if (game.metascore === '') {
      // metascore.innerHTML = `<b>METASCORE:</b> N/A`;
      // } else {
      // metascore.innerHTML = `<b>METASCORE:</b> ${game.metascore}`;
      // }
      // gameDetails.appendChild(metascore);

      const operatingSystems = $('<p>')
      let sysString = '';
      $.each( game.platforms, ( key, value ) => {
        if (value) {
          sysString += `  ${key}`
        }
      });
      operatingSystems.html(`<b>OPERATING SYSTEMS:</b> ${sysString.toUpperCase()}`);
      gameDetails.append(operatingSystems);

      // const operatingSystems = document.createElement('p');
      // operatingSystems.innerHTML = `<b>OPERATING SYSTEMS:</b>`;
      // let sysString = '';
      // for ( key in game.platforms ) {
      //   if ( game.platforms[key] ) {
      //     sysString += `  ${key}`;
      //   }
      // }
      // operatingSystems.innerHTML += sysString.toUpperCase();
      // gameDetails.appendChild(operatingSystems);

      const price = $('<p>');
      if ( 'price' in game ) {
        price.html(`<b>PRICE:</b> ${formatter.format(game.price.final/100)}`);
      } else {
        price.html('<b>PRICE:</b> No Price Available');
      }
      gameDetails.append(price);

      // const price = document.createElement('p');
      //  if ( 'price' in game ) {
      //   price.innerHTML = `<b>PRICE:</b> ${formatter.format(game.price.final/100)}`;
      //   } else {
      //   price.innerHTML = `<b>PRICE:</b> No Price Available`;
      //   }
      // gameDetails.appendChild(price);

      gameResult.append(gameDetails);
      searchResults.append(gameResult);
      // gameResult.appendChild(gameDetails);
      // searchResults.appendChild(gameResult);
    })
}

