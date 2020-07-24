// ==UserScript==
// @name         Emote Logger
// @namespace    p1
// @run-at       document-start
// @version      0.1
// @description  Logs all emotes sent in chat in console!
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
		var emotesArray;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				emotesArray = JSON.parse(this.responseText);
			}
		};
		xmlhttp.open("GET", world.media.emotes.spriteSheet.src, true);
		xmlhttp.send();
		//let emotesArray = world.media.emotes.themes;


		var emoteLUT = {adventure: "🗡", angry: "😡", awe: "🥺", blush: "😳", cheeky: "😝", coffee: "☕️", confused: "🤔❓", cool: "😎", crying: "😭", daze: "😵", fart: "💨🎵", gg: "😄🏳️ GG!", happy: "🙂", idea: "😲💡", laugh: "🤣", sad: "😔", scared: "😲", serious: "😐", sick: "🤢", sleep: "😴", smile: "😁", thumbs_up: "😄👍", upset: "😠", worry: "😰", yum: "😋"};


		function getName(userID){var userName;world.room.playerCrumbs.forEach(crumb=>{if(crumb.i==userID){userName=crumb.n}});return userName;};

		world.on("E", function(emoteEvent) {
			var critterImage = "";
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

			var critterEmoteText = world.stage.room.players[emoteEvent.i].critterId + "_" + emoteEvent.e;
			var critterEmote = "";

			if (emoteEvent.e === undefined || emotesArray.animations[critterEmoteText] === undefined) {
				critterEmote = emoteLUT["smile"] + " (smile)";
			} else {
				critterEmote = emoteLUT[emoteEvent.e] + " (" + emoteEvent.e + ")";
			};

			console.info('%c' + '[' + critterImage + '] ' + getName(emoteEvent.i) + ': ' + critterEmote, 'font-size:small');
		});
	};
})();
