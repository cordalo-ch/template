var cordaloEnv = (function() {
    function _GETvar(parameterName) {
        var result = null,
        tmp = [];
        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
        return result;
    };
    function _GetMainUrl() {
        if (port != null) {
            if (local != null) {
                return "http://"+local+"":"+port
            } else {
                return document.location.protocol + "//" + document.location.hostname + ":" + port
            }
        } else {
            return document.location.protocol + "//" + document.location.hostname + ":" + document.location.port
        }
    }
    function init() {
        jQuery.fn.fail = function(f) {
            var o = $(this[0]) // This is the element
            f("missing mock for "+o);
            return this; // This is needed so other functions can keep chaining off of this
        };
        if (local) {
            if (local == "true") {
                local = "localhost"
            }
        }
    }
    var port = _GETvar("port");
    var local = _GETvar("local");
    var mock = _GETvar("mock");
    var MAIN_URL = _GetMainUrl();
    var MOCK_DATA = [];
    init();

    return {
        API_URL: function(file) {
            return (file != null) ? MAIN_URL + file : MAIN_URL
        },
        addMock: function(url, data) {
            MOCK_DATA[url] = data;
        },
        findAPI: function(url) {
            const regex = /http[s]?\:\/\/[^\/]*\:?[0-9]*(\/.*)/gs;
            let m;
            var resultMatch = url;

            while ((m = regex.exec(url)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    if (match != url) {
                        resultMatch = match;
                        return match;
                    }
                });
            }
            return resultMatch;
        },
        jQuery_get: function(object) {
            if (mock) {
                var api = cordaloEnv.findAPI(object.url);
                if (api && MOCK_DATA[api]) {
                    console.log("successful MOCK_DATA for url "+object.url);
                    object.success(MOCK_DATA[api]);
                } else {
                    console.log("missing MOCK_DATA for url "+object.url);
                }
                return $(API_Failed());
            }
            return $.get(object);
        }
    };
})();


function API_Failed() {
    this.f;
}
API_Failed.prototype.fail = function(f) {
    this.f = f;
}

$get=cordaloEnv.jQuery_get;
