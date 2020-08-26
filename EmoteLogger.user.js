// ==UserScript==
// @name         Emote Logger
// @namespace    p1
// @run-at       document-start
// @version      0.4
// @updateURL    https://github.com/p1-BCMC/EmoteLogger/raw/master/EmoteLogger.user.js
// @downloadURL  https://github.com/p1-BCMC/EmoteLogger/raw/master/EmoteLogger.user.js
// @description  Logs all emotes sent ingame in console!
// @author       p1
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// @grant        none
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// ==/UserScript==

(function() {
    'use strict';

    let timer = setInterval(function() {
		if (typeof world !== "undefined" && typeof world.stage !== "undefined" && typeof world.stage.room !== "undefined" && typeof world.socket !== "undefined") {
			clearInterval(timer);
			onWorldLoaded();
		}
	}, 1000/60);

	function onWorldLoaded() {

		let emotes = client.loadedSpriteSheets.emotes;
		let themes = []; // Will contain all the emote names

		let emoteContainer; // Will contain the emote sprites


		// Get emote list from client
		emotes._animations.forEach(theme => {
			if (theme.toLowerCase().startsWith(world.player.critterId.toLowerCase())) {
				themes.push(theme.toLowerCase());
			};
		});

		let emoteLUT = {adventure: "🗡", angry: "😡", awe: "🥺", blush: "😳", cheeky: "😝", coffee: "☕️", confused: "🤔❓", cool: "😎", crying: "😭", daze: "😵", fart: "💨🎵", gg: "😄🏳️ GG!", happy: "🙂", idea: "😲💡", laugh: "🤣", sad: "😔", scared: "😲", serious: "😐", sick: "🤢", sleep: "😴", smile: "😁", thumbs_up: "😄👍", upset: "😠", worry: "😰", yum: "😋"};


		function getName(playerId) {
			let playerName;
			world.room.playerCrumbs.forEach(crumb => {
				if (crumb.i == playerId) {
					playerName = crumb.n;
				};
			});
			return playerName;
		};



		function logEmoteEvent(emoteEvent) {
			let critterImage = "";
			switch(world.stage.room.players[emoteEvent.i].critterId) {
				case "hamster":
					critterImage = "🐹";
					break;
				case "raccoon":
					critterImage = "🦝";
					break;
				case "beaver":
					critterImage = "🦫";
					break;
				case "lizard":
					critterImage = "🦎";
					break;
				case "snail":
					critterImage = "🐌";
					break;
				default:
					critterImage = "NEW CRITTER";
			};

			let critterEmoteText = world.stage.room.players[emoteEvent.i].critterId + "/" + emoteEvent.e.toLowerCase();
			let critterEmote = "";

			if (emoteEvent.e === undefined || themes[critterEmoteText] === undefined) {
				critterEmote = emoteLUT["smile"] + " (smile)";
			} else {
				critterEmote = emoteLUT[emoteEvent.e] + " (" + emoteEvent.e + ")";
			};

			console.info('%c' + '[' + critterImage + '] ' + getName(emoteEvent.i) + ': ' + critterEmote, 'font-size:small');
		};

		// To log own emotes as well...
		world.emote = joinFunction(world.emote, logOwnEmote); // Uses SArpnt's "joinFunction"

		function logOwnEmote(emote) {
			logEmoteEvent({i: world.player.playerId, e: emote});
		};

		world.socket.on("E", function (emoteEvent) {
			logEmoteEvent(emoteEvent);
		});
	};
})();
