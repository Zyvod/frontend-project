const body = $('body');
const searchBar = $('#searchBar');
const searchBtn = $('#searchBtn');
const currentLogBtn = $('#currentLog')
const saveBtn = $('#saveBtn')
const loadBtn = $('#loadBtn')
const searchResults = $('#searchResults')
const savedLogs = []
let backLogData = {}
let loadLogs
let backLogKey = 0

function searchGames(gameData,userSearch) {
  $.get(`https://store.steampowered.com/api/storesearch/?term=${userSearch}&=english&cc=NL`, (data) => {
  for (var i = 0; i < data.items.length; i++) {
   gameData.push(data.items[i]);
  }
  console.log(gameData);
  populateResults(gameData);
 })
}

function populateResults(gameData) {
  const formatter = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD'
  });

  searchResults.empty();

   gameData.forEach( function(game) {

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

     const addToBackLog = $('<button>' , {
       class: 'backLog-btn'
     })
     addToBackLog.html('Add To Back-Log')
     addToBackLog.on('click', (event) => {
       backLogData[`${backLogKey}`] = $(event.target).parent()[0];
       backLogKey ++
     })
     gameDetails.append(addToBackLog);

     gameResult.append(gameDetails);
     searchResults.append(gameResult);

   })
}
searchBtn.on('click', (event) => {
  let userSearch = '';
  let gameData = [];
  userSearch = searchBar.val();
  searchGames(gameData,userSearch);
})

currentLogBtn.on('click', (event) => {
  searchResults.empty();
  for (let key in backLogData) {
    searchResults.append(backLogData[key])
  }
})

saveBtn.on('click', (event) => {
  let saveName = prompt('What Would You Like to Name Your Log?')
  let i = 0
  for ( let key in backLogData ){
    console.log(backLogData[key].outerHTML)
     savedLogs[i] = backLogData[key].outerHTML
     i++
   }
    //  console.log(savedLogs)
     localStorage.setItem(`${saveName}`, JSON.stringify(savedLogs))
    //  console.log(localStorage);
})

loadBtn.on('click', (event) => {
  let loadName = prompt('What Log Would You Like To Load?')
  let loadLogs = (JSON.parse(localStorage.getItem(`${loadName}`)));

  searchResults.empty();
  backLogData = {}
  backLogKey = 0

  loadLogs.forEach( function(game) {

    const gameResult = $('<span>', {
    class: 'game-result'
    });

    const gameDetails = game

    gameResult.append(gameDetails);

    backLogData[`${backLogKey}`] = gameResult.children()[0]
    backLogKey++

    searchResults.append(gameResult);
    console.log(backLogData)
  })
})

body.on('keydown', (event) => {
  if ( event.originalEvent.key === 'Enter') {
    let userSearch = '';
    let gameData = [];
    userSearch = searchBar.val();
    searchGames(gameData,userSearch);
  }
})


