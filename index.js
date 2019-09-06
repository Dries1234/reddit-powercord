var request = require('request');



const { Plugin } = require('powercord/entities');

module.exports = class Embed extends Plugin {
  startPlugin () {
    this.registerCommand(
      'reddit',
      [],
      'Request the top posts from a subreddit',
      '{c} [Subreddit] [all|year|month|week|day|hour] [clyde|send]',
        async (args) => {
        if(!args[1]){
            args[1] = "all"
        }
        if(!args[2]){
            args[2] = 'clyde'
        }
        let redditUrl = `https://www.reddit.com/r/${args[0]}/top.json?t=${args[1]}`;
        
        let thumbnails;
        let message;
        let titles;
        await reddit(redditUrl).then(body => {
            console.log(body.data.children[0].data)
            thumbnails = body.data.children[0].data.thumbnail
            console.log(thumbnails)
            
            titles = body.data.children[0].data.title
            message = body.data.children[0].data.permalink
            return Promise.resolve([thumbnails,titles,message])
        })
        if(message){
            if(args[2] === 'clyde'){
                return {
                    send: false,
                    result: {
                        type: 'rich',
                        title: args[0],
                        url : `https://reddit.com${message}`,
                        description: titles.replace('amp;',''),
                        thumbnail: {url:thumbnails},
                        color: 0xc40000
                        }
                }
            }
            else if(args[2] === 'send'){
                return {
                    send: true,
                    result: `https://reddit.com${message}`
                }
            }
    }
      
      }
      
      )

    }
};




function reddit(redditUrl){
return new Promise((resolve,reject) => {
request({
    url: redditUrl,
    json: true
}, function (error, response, body) {
    
    if(error){
        reject()
        console.log(error);
    }
    if (!error) {
        resolve(body)
        
        
    
    }

})

})
}