define([], function () {
    return {
        subscribeObjects: function (mxObjs, callback) {
            var allGuids = mxObjs.map(obj => obj.getGuid());//ES6 syntax
            var subscriptions = allGuids.map(guid =>
                mx.data.subscribe({
                    guid,
                    callback
                })
            )
            return subscriptions;
        },
        retrieveEntity: function (shapeEntity, association, referredId) {
            return new Promise(function (resolve) {
                var xPath = "//" + shapeEntity + "[" + association.split("/")[0] + "=" + referredId + "]";
                mx.data.get({
                    xpath: xPath,
                    "callback": function (results) {
                        resolve(results);
                    }
                });
            })
        },
        _execMf: function (mf, guid, cb) {
            if (mf && guid) {
                mx.ui.action(mf, {
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    callback: cb && cb(),
                    error: function (error) {
                        console.debug(error.description);
                    }
                }, this);
            }
        },
    }
})