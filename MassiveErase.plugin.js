/**
 * @name MassiveErase
 * @version 0.0.1
 * @description Use it to delete a large number of messages more easily and quickly
 * @author Ka#0001
 * @authotID 502687173099913216
**/

module.exports = class MassiveErase {
    getName () {return "MassiveErase"}
    getAuthor () {return "Ka#0001"}
    getVersion () {return "0.0.1"}
    getDescription () {return "Use it to delete a large number of messages more easily and quickly"}
    load() {}
    start() { BdApi.alert(this.getName())}
    stop() {}

    eraseMessage(messages, authToken) {
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
            console.log("dm")
        } else {
            console.log("guild")
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
        console.log(resMSG)
    }
} 

/*@end @*/