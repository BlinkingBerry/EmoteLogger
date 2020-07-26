// ==UserScript==
// @name         Emote Logger
// @namespace    p1
// @run-at       document-start
// @version      0.3
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
// ==/UserScript==

(function() {
    'use strict';

    let timer = setInterval(function() {
		if (typeof world !== "undefined" && typeof world.stage !== "undefined" && typeof world.stage.room !== "undefined") {
			clearInterval(timer);
			onWorldLoaded();
		}
	}, 1000/60);

	function onWorldLoaded() {
		let emotesArray;
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				emotesArray = JSON.parse(this.responseText);
			}
		};
		xmlhttp.open("GET", world.media.emotes.spriteSheet.src, true);
		xmlhttp.send();
		//let emotesArray = world.media.emotes.themes;


		let emoteLUT = {adventure: "🗡", angry: "😡", awe: "🥺", blush: "😳", cheeky: "😝", coffee: "☕️", confused: "🤔❓", cool: "😎", crying: "😭", daze: "😵", fart: "💨🎵", gg: "😄🏳️ GG!", happy: "🙂", idea: "😲💡", laugh: "🤣", sad: "😔", scared: "😲", serious: "😐", sick: "🤢", sleep: "😴", smile: "😁", thumbs_up: "😄👍", upset: "😠", worry: "😰", yum: "😋"};


		function getName(playerId){
			let userName;
			world.room.playerCrumbs.forEach(crumb=>{
				if(crumb.i==playerId) {
					userName=crumb.n
				}
			});
			return userName;
		};

		world.on("E", function(emoteEvent) {
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

			let critterEmoteText = world.stage.room.players[emoteEvent.i].critterId + "_" + emoteEvent.e;
			let critterEmote = "";

			if (emoteEvent.e === undefined || emotesArray.animations[critterEmoteText] === undefined) {
				critterEmote = emoteLUT["smile"] + " (smile)";
			} else {
				critterEmote = emoteLUT[emoteEvent.e] + " (" + emoteEvent.e + ")";
			};

			console.info('%c' + '[' + critterImage + '] ' + getName(emoteEvent.i) + ': ' + critterEmote, 'font-size:small');
		});
	};
})();
