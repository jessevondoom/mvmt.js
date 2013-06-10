/**
 * Front-end/UI for SoundManager2, global progress events and animations
 *
 * COMPRESSION SETTINGS
 * http://closure-compiler.appspot.com/
 * Closure compiler, SIMPLE MODE, then append a semi-colon to the front to be careful
 *
 * PUBLIC-ISH FUNCTIONS
 * window.cashmusic.lightbox.injectIframe(url url)
 *
 * @package cashmusic.org.cashmusic
 * @author CASH Music
 * @link http://cashmusic.org/
 *
 * Copyright (c) 2013, CASH Music
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list
 * of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this
 * list of conditions and the following disclaimer in the documentation and/or other
 * materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 * OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 **/

(function() {
	'use strict';
	var cm = window.cashmusic;
	cm.soundplayer = {
		player: false,
		playlist: false,
		playlists: {},
		sound: false,

		_init: function() {
			var self = cm.soundplayer;

			// look for .cashmusic.soundplayer divs/links
			var inlineLinks = document.querySelectorAll('a.cashmusic.soundplayer');
			var iLen = inlineLinks.length;
			if (iLen > 0) {
				cm.styles.injectCSS(
					'a.cashmusic.soundplayer.inline.stopped:after{content: " [▸]";}' +
					'a.cashmusic.soundplayer.inline.playing:after{content: " [■]";}'
				);

				for (var i=0;i<iLen;i++) {
					var a = inlineLinks[i];
					soundManager.createSound({
						id: a.href,
						url: a.href
					});

					cm.styles.addClass(a,'stopped');
					cm.events.add(a,'click',function(e) {
						if (cm.styles.hasClass(a,'toggle')) {
							var s = soundManager.getSoundById(a.getAttribute('data-soundid'));
						} else {
							var s = soundManager.getSoundById(a.href);
						}
						if (s) {
							if (s.playState == 0) {
								self.play(s.id);
							} else {
								self.stop();
							}
							
							e.preventDefault();
							return false;
						}
					});
				}
			}
		}
	};



	// Thanks Kirupa Chinnathambi!
	// http://www.kirupa.com/html5/getting_mouse_click_position.htm
	cm.measure.getClickPosition = function(e) {
		var parentPosition = cm.measure.getPosition(e.currentTarget);
		var xPosition = e.clientX - parentPosition.x;
		var yPosition = e.clientY - parentPosition.y;
		return { x: xPosition, y: yPosition };
	};

	// Thanks Kirupa Chinnathambi!
	// http://www.kirupa.com/html5/getting_mouse_click_position.htm
	cm.measure.getPosition = function(element) {
		var xPosition = 0;
		var yPosition = 0;
		  
		while (element) {
			xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
			yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
			element = element.offsetParent;
		}
		return { x: xPosition, y: yPosition };
	};

	window.SM2_DEFER = true;
	cm.loadScript(cm.path+'lib/soundmanager/soundmanager2.js', function() {
		var self = cm.soundplayer;
		window.soundManager = new SoundManager();
		soundManager.setup({
			url: cm.path+'lib/soundmanager/swf/',
			flashVersion: 9,
			flashLoadTimeout: 7500,
			flashPollingInterval:30,
			html5PollingInterval:30,
			useHighPerformance:true,
			onready: function() {
				self._init();
			},
			// ontimeout: function(status) {
			// 	console.log('SM2 failed to start. Flash missing, blocked or security error?');
			// 	console.log('Trying: ' + soundManager.url);
			// },
			defaultOptions: {
				// onload: function() {
				// 	self._doResume({id: this.id});
				// },
				onstop: function() {
					self._doStop({id: this.id});
				},
				onfinish: function() {
					self._doFinish({id: this.id});
				},
				onpause: function() {
					self._doPause({id: this.id});
				},
				onplay: function() {
					self._doPlay({id: this.id});
				},
				onresume: function() {
					self._doResume({id: this.id});
				},
				stream: true,
				usePolicyFile: true,
				volume: 100,
				whileloading: function() {
					self._doLoading({
						id: this.id,
						loaded: this.bytesLoaded,
						total: this.bytesTotal,
						percentage: Math.round((this.bytesLoaded / this.bytesTotal) * 1000) / 10
					});
				},
				whileplaying: function() {
					var p = Math.round((this.position / this.duration) * 10000) / 100;
					//if (this.readyState = 1) {
						//p = Math.round(p * (this.bytesLoaded / this.bytesTotal));
					//}
					self._doPlaying({
						id: this.id,
						position: this.position,
						duration: this.duration,
						percentage: p
					});
				}
			}
		});
		soundManager.beginDelayedInit();





		self.next = function() {

		};

		self.pause = function() {
			if (self.sound) {
				self.sound.pause();
			}
		};

		self.play = function(id) {
			var s = soundManager.getSoundById(id);
			self.sound = s;
			s.play();

			// deal with inline buttons
			var inlineLinks = document.querySelectorAll('a.cashmusic.soundplayer[href="' + id + '"]');
			if (inlineLinks.length > 0) {
				var iLen = inlineLinks.length;
				for (var i=0;i<iLen;i++) {
					cm.styles.swapClasses(inlineLinks[i],'stopped','playing');
				}
			}
		};

		self.previous = function() {

		};

		self.resume = function() {
			if (self.sound) {
				if (self.sound.paused) {
					self.sound.resume();
				}
			}
		};

		self.stop = function() {
			if (self.sound) {
				self.sound.setPosition(0);
				self.sound.stop();
			}
		};

		self.toggle = function() {

		};



		// All of the querySelectorAll calls seem excessive, but we should respect the idea of 
		// dynamic DOM injection, AJAX, etc. Also these are mostly user-initiated so not often on
		// a hundreds-per-second scale.
		self._doFinish = function(detail) {
			var setstyles = document.querySelectorAll('*.cashmusic.setstyles');
			self._updateStyles(setstyles,'finish');
		};

		self._doLoading = function(detail) {
			//console.log('loading: ' + detail.percentage + '%');
			var tweens = document.querySelectorAll('*.cashmusic.tween');
			self._updateTweens(tweens,'load',detail.percentage);
		};

		self._doPause = function(detail) {
			var setstyles = document.querySelectorAll('*.cashmusic.setstyles');
			self._updateStyles(setstyles,'pause');
		};

		self._doPlay = function(detail) {
			var setstyles = document.querySelectorAll('*.cashmusic.setstyles');
			self._updateStyles(setstyles,'play');
		};

		self._doPlaying = function(detail) {
			//console.log('playing: ' + detail.percentage + '% / (' + detail.position + '/' + detail.duration + ')');
			var tweens = document.querySelectorAll('*.cashmusic.tween');
			self._updateTweens(tweens,'play',detail.percentage);
		};

		self._doResume = function(detail) {
			var setstyles = document.querySelectorAll('*.cashmusic.setstyles');
			self._updateStyles(setstyles,'resume');
		};

		self._doStop = function(detail) {
			// deal with inline buttons
			var inlineLinks = document.querySelectorAll('a.cashmusic.soundplayer[href="' + self.sound.id + '"]');
			if (inlineLinks.length > 0) {
				var iLen = inlineLinks.length;
				for (var i=0;i<iLen;i++) {
					cm.styles.swapClasses(inlineLinks[i],'playing','stopped');
				}
			}

			var setstyles = document.querySelectorAll('*.cashmusic.setstyles');
			self._updateStyles(setstyles,'stop');
			self.sound = false;
		};





		self._checkIds = function(id,data) {
			var soundId = '';
			var playerId = '';
			// get any required sound/player ids
			if (typeof data.onSound !== 'undefined') {soundId = data.onSound}
			if (typeof data.onPlayer !== 'undefined') {playerId = data.onPlayer}
			if (soundId !== '' && playerId !== '') {
				// check player and id
				if (id != playerId + soundId) {return false}
			} else if (soundId !== '' && playerId === '') {
				// check id
				if (id.substring((playerId.length + soundId.length) - soundId.length) != soundId) {return false}
			} else if (soundId === '' && playerId !== '') {
				// check player
				if (id.substring(0, playerId.length) != playerId) {return false}
			}
			return true;
		};

		/*
		fires on progress for: play, load 

		{
			"play":[
				{
					"name":"left",
					"startAt":0,
					"endAt":50,
					"startVal":0,
					"endVal":250,
					"units":"px",
					"onSound":"url",
					"onPlayer":"playerId"
				}
			],
			"load":[
				{
					"name":"left",
					"startAt":0,
					"endAt":50,
					"startVal":0,
					"endVal":250,
					"units":"px"
				}
			]
		}
		*/
		self._updateTweens = function(elements,type,percentage) {
			var eLen = elements.length;
			for (var i=0;i<eLen;i++) {
				var el = elements[i];
				var data = el.getAttribute('data-tween');
				data = JSON.parse(data);
				if (data) {
					if (typeof data[type] !== 'undefined') {
						var dLen = data[type].length;
						var val = false;
						var step = false
						for (var n=0;n<dLen;n++) {
							step = data[type][n];
							if (self._checkIds(self.sound.id,step)) {
								if (percentage >= step.startAt && percentage <= step.endAt) {
									// starting value + ((total value range / total percentage span) * true percentage - startAt percentage)
									val = step.startVal + (((step.endVal - step.startVal) / (step.endAt - step.startAt)) * (percentage - step.startAt));
									if (step.units == 'px') {
										val = Math.floor(val); // round pixels to save CPU
									} else {
										val = val.toFixed(2); // percentage, etc need 2 points for better positioning
									}
									el.style[step.name] = val + step.units;
								}
							}
						}
					}
				}
			}
		};

		/*
		fires on events for: finish, pause, play, resume, stop

		{
			"stop":[
				{
					"name":"left",
					"val":250,
					"units":"px",
					"onSound":"url",
					"onPlayer":"playerId"
				}
			]
		}
		*/
		self._updateStyles = function(elements,type) {
			var eLen = elements.length;
			for (var i=0;i<eLen;i++) {
				var el = elements[i];
				var data = el.getAttribute('data-styles');
				data = JSON.parse(data);
				if (data) {
					if (typeof data[type] !== 'undefined') {
						var dLen = data[type].length;
						for (var n=0;n<dLen;n++) {
							if (self._checkIds(self.sound.id,data[type][n])) {
								el.style[data[type][n].name] = data[type][n].val + data[type][n].units;
							}
						}
					}
				}
			}
		};

	});
}());