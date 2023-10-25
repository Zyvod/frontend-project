const body = document.getElementsByTagName('body')


console.log($.get('https://store.steampowered.com/api/storesearch/?term=halo&=english&cc=NL', (data) => {
 console.log(data)
}))


console.log($.get('https://store.steampowered.com/api/getappsingenre/?genre=rpg&cc=us&l=english', (data) => {
 console.log(data)
}))



//What data do we get from each search?

// each item contains the following keys [ id,metascore,name,platforms,price,stereamingvideo,tiny_image,type]

// the key platforms contains the keys [linux,mac,windows]
// the key price contains the keys [ currency,final,initial]
