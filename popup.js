var _key = "tag";
// returns the url with key-value pair added to the parameter string.
function insertParam(url, key, value) {
    if (url.indexOf('?') != -1) {
        var pairset = url.split('&');

        var i = pairset.length;
        var pair;

        key = escape(key);
        value = escape(value);

        while (i--) {
            pair = pairset[i].split('=');

            if (pair[0] == key) {
                pair[1] = value;
                pairset[i] = pair.join('=');
                break;
            }
        }

        if (i < 0) {
            pairset[pairset.length] = [key, value].join('=');
        }

        return pairset.join('&');
    }
    else {
        return url + '?' + [key, value].join('=');
    }
}

// listen for click on the extensions toolbar button
chrome.browserAction.onClicked.addListener(
        function (tab) {
            // Open the Amazon deals page
            chrome.tabs.create(
                    {
                        'url': 'http://www.savepaise.com',
                        'selected': true
                    },
            function (tab) {
                // tab opened, further processing takes place in content.js                
            }
            );
        }
);

// listen for new web page requests to the flipkart site
chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            // only for the top-most window (ignore frames)
            if (window == top) {
                var trackId = "praveenaa";
                var _keyFlipkart = "affid";
                // if the url does not already contain the tracking id
                if (details.url.search(trackId) == -1 &&
                        details.url.search("/api/") == -1 &&
                        details.url.search("/lc/") == -1 &&
                        details.url.search("/sw.js") == -1) {
                    // redirect them to the url with the new tracking id parameter inserted
                    return {redirectUrl: insertParam(details.url, _keyFlipkart, trackId)};
                }
            }
        },
        {
            urls: [
                "http://www.flipkart.com/*", "https://www.flipkart.com/*",
                "http://dl.flipkart.com/*", "https://dl.flipkart.com/*"
            ]
        }, // only run for requests to the following urls
['blocking']    // blocking permission necessary in order to perform the redirect
        );

// listen for new web page requests to the amazon.in site
chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            // only for the top-most window (ignore frames)
            if (window == top) {
                var trackId = "savepaise-21";

                // if the url does not already contain the tracking id
                if (details.url.search(trackId) == -1 &&
                        details.url.search("ap/signin") == -1 &&
                        details.url.search("ap/widget") == -1) {
                    // redirect them to the url with the new tracking id parameter inserted
                    return {redirectUrl: insertParam(details.url, _key, trackId)};
                }
            }
        },
        {
            urls: [
                "http://www.amazon.in/*", "https://www.amazon.in/*"]
        }, // only run for requests to the following urls
['blocking']    // blocking permission necessary in order to perform the redirect
        );

var host = "https://linksredirect.com/?pub_id=22090CL19883&source=linkkit&subid=praveen&url=";
chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            var urls = new URL(details.url);
            var DomainName = urls.hostname;
            return {redirectUrl: host + details.url + details.url.match(/^https?:\/\/[^\/]+([\S\s]*)/)[1]};
        },
        {
            urls: [
                "*://jabong.com/",
                "*://www.jabong.com/",
                "*://tatacliq.com/",
                "*://www.tatacliq.com/",
                "*://bigbasket.com/",
                "*://www.bigbasket.com/",
                "*://swiggy.com/",
                "*://www.swiggy.com/",
                "*://limeroad.com/",
                "*://www.limeroad.com/",
                "*://shopclues.com/",
                "*://www.shopclues.com/"
            ],
            types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
        },
["blocking"]
        );