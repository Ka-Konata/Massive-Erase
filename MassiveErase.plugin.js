/**
 * @name MassiveErase
 * @version 0.0.1
 * @description Use it to delete a large number of messages more easily and quickly
 * @author Ka#0001
 * @authotID 502687173099913216
**/

module.exports = class MassiveErase {
    constructor() {
        this.MEbutton = undefined
    }

    getName () {return "MassiveErase"}
    getAuthor () {return "Ka#0001"}
    getVersion () {return "0.0.1"}
    getDescription () {return "Use it to delete a large number of messages more easily and quickly"}
    load() {}

    start() { 
        // Adding the JQuery Library to the DOM
        const JQuery = document.createElement("script");
        JQuery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        JQuery.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(JQuery);

        // Making the Massive Erase's Start Button
        const MEAtributes = ZeresPluginLibrary.WebpackModules.getByProps('children', 'iconWrapper', 'toolbar', 'container');
        const MEhtml = 
        `<div tabindex="0" class="${MEAtributes.iconWrapper} ${MEAtributes.clickable}" role="button">
        <svg aria-hidden="true" class="${MEAtributes.icon}" name="Open Logs" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"/>
        </svg>
        </div>`

        this.MEbutton = document.createElement("template")
        this.MEbutton.innerHTML = MEhtml.trim()
        this.MEbutton = this.MEbutton.content.firstChild

        this.MEbutton.onclick = function() {
            BdApi.alert("DELETING!!") // Make a function to start Deleting the messages
        }

        new ZeresPluginLibrary.EmulatedTooltip(this.MEbutton, 'Erase Selected Messages', { side: 'bottom' })
        // ------------------------------------------------------------------------------------- //
    }

    observer({ addedNodes }) {
        for(let Node of addedNodes) {
            try {
                // Checking if the user switched channels
                if(Node.className.includes("title-") && Node.className.includes("container-") && Node.className.includes("themed-") || Node.className.includes("chat-")) {

                    // Setting back the Message Erase's Button
                    const searchBar = $('div[class*="search-"]')[0];
                    searchBar.parentElement.insertBefore(this.MEbutton, searchBar)
                    break
                }
            } catch(error) {}
        }
    }

    stop() {}
} 


class DiscordAPI {
    eraseMessage(messages, authToken) {
        // Search some messages
        let url = `https://discord.com/api/v9/channels/${messages[0].channel_id}/messages/${messages[0].id}`
        const req = new XMLHttpRequest

        const data = {
            "messages": messages
        }

        req.open("DELETE", url, true)
        req.setRequestHeader("Authorization", authToken)
        req.send()
    }

    getMessages(guildId, channelId, authorId, authToken, eraseMin, eraseMax) {
        // Making the url to search
        let url
        const searchParams = `search?author_id=${authorId}&channel_id=${channelId}&min_id=${eraseMin}&max_id=${eraseMax}&sort_by=timestamp&sort_order=desc`

        if (guildId === "@me") {
            url = `https://discord.com/api/v6/channels/${channelId}/messages/` + searchParams
        } else {
            url =  `https://discord.com/api/v6/guilds/${guildId}/messages/` + searchParams
        }

        // Doing the request
        const req = new XMLHttpRequest()

        req.onload = function() {
            resMSG = Object(req.response)
        }

        req.responseType = "json"
        req.open("GET", url, true)
        req.setRequestHeader("Authorization", authToken)
        req.send()
    }
}

/*@end @*/