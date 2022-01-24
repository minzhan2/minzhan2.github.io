"use strict";
window.XdUtils = window.XdUtils || function() {
		function a(a, b) {
			var c, d = b || {};
			for (c in a) a.hasOwnProperty(c) && (d[c] = a[c]);
			return d
		}
		return {
			extend: a
		}
	}(),
	function() {
		//allowed domains
		//TODO: Try to have this whitelist in a separate place where it can be updated easily
		var whitelist = [
			".cisco.com",
			"acquisitionconnection.com",
			"cisco-ecommunities.jiveon.com",
			"ciscostaging.jiveon.com",
			"cisco-marketing.uat5.hosted.jivesoftware.com",
			"ciscolive.com", 
			"youtubecisco.com",
			"jasper.com",
			"cisco-inspire.jp",
			"acc-test.jp",
			"unleashedit.com",
			"uberflip.com",
			"connectedfuturesmag.com",
			"smartsheet.com",
			"51cto.com",
			"chinabyte.com",
			"huffingtonpost.ca",
			"cr.silverpush.co",
			"sueddeutsche.de",
			"ciscodnareadinessbrief.com",
			"uat-ciscodnareadinessbrief-com.webappuat.com",
			"ticcostarica.com",
			"todoenredesecuador.com",
			"ciscosmb.psdops.com",
			"devnetcreate.io",
			"ciscobusinesscloudadvisoradoptionreport.com",
			".webex.com",
			".rainfocus.com"
		];
		var returnOrigin = ""; //to send data back to the same origin from where request is received
		function verifyOrigin(origin) {
			var len = whitelist.length;
			//console.log("iframe-origin:",origin);
			returnOrigin = origin;
			for (var i = 0; i < len; i++) {
				if (whitelist[i] !== "") {
					var pattern = whitelist[i];
					pattern = pattern.replace(new RegExp("\\.", "g"), "\\."); //convert all "."s in url to non-special using escape char
					pattern = pattern.replace(new RegExp("%", "g"), ".*?"); //Replace the wildcard "%" with ".*?" to match anything including blank("")
					var re = new RegExp(pattern);
					if (re.test(origin)) {
						return true;
					}
				}
			}
			return false;
		}

		function a(a, b) {
			var c = XdUtils.extend(b, l);
			//console.log("iframe-Posting a message back to origin:",returnOrigin);
				c.id = a, parent.postMessage(JSON.stringify(c), returnOrigin); //Removed '*'. If origin isn't known, no need to send data
		}

		function b(b, c) {
			var d = localStorage.getItem(c),
				e = {
					key: c,
					value: d
				};
			a(b, e)
		}

		function c(b, c, d) {
			localStorage.setItem(c, d);
			var e = localStorage.getItem(c),
				f = {
					success: e === d
				};
			a(b, f)
		}

		function d(b, c) {
			localStorage.removeItem(c), a(b, {})
		}

		function e(b, c) {
			var d = localStorage.key(c);
			a(b, {
				key: d
			})
		}

		function f(b) {
			var c = JSON.stringify(localStorage).length;
			a(b, {
				size: c
			})
		}

		function g(b) {
			var c = localStorage.length;
			a(b, {
				length: c
			})
		}

		function h(b) {
			localStorage.clear(), a(b, {})
		}

		function i(a) {
			//console.log("iframe-event:",a);
			var origin = a.origin || a.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
			if (!verifyOrigin(origin)) {
				//console.log("iframe-Not from valid origin, hence returning--origin:",origin);
			    return;
			}
			var i;
			try {
				i = JSON.parse(a.data)
			} catch (a) {}
			try{
				i && i.namespace === k && ("set" === i.action ? c(i.id, i.key, i.value) : "get" === i.action ? b(i.id, i.key) : "remove" === i.action ? d(i.id, i.key) : "key" === i.action ? e(i.id, i.key) : "size" === i.action ? f(i.id) : "length" === i.action ? g(i.id) : "clear" === i.action && h(i.id))
			} catch (e){}
			
		}

		function j() {
			var a = {
				namespace: k,
				id: "iframe-ready"
			};
			var org = document.referrer.split("?")[0];
			//console.log("iframe-Posting a message from j where addEventListener is not defined:",org);
			if (verifyOrigin(org)) {
				//console.log("iframe-Valid origin, posting msg back to origin:",org);
				parent.postMessage(JSON.stringify(a), org)
			    return;
			}
			//else{console.log("Not from a valid origin");}
		}
		var k = "cross-domain-local-message",
			l = {
				namespace: k
			};
		window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i), j()
	}();
