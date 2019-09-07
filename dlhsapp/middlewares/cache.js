/**
 * This is the cache middleware making use of
 * node-cache to speed up users experience.
 * caches the use request using the endpoints
 * complete url as key to the cache. This prevent
 * users from having to hit the server severally
 * within the validity period of the cache with the
 * same request.
 */
"use strict";
const NodeCache = require('node-cache')

// stdTTL: time to live in seconds for every generated cache element.
const cache = new NodeCache({ stdTTL: 15 * 60 })

function getUrlFromRequest(req) {
    const url = req.protocol + '://' + req.headers.host + req.originalUrl
    return url
}

/**
 * This function store endpoint data into local
 * storage set up by cache
 */
module.exports.set = (req, res, next) => {
    const url = getUrlFromRequest(req)
    cache.set(url, res.locals.data)
    return next()
}

/**
 * This function fetch data from local storage
 * in the cache system
 */
module.exports.get = (req, res, next) => {
    const url = getUrlFromRequest(req)
    const content = cache.get(url)
    if (content) {
        return res.status(200).send(content)
    }
    return next()
}

/**
 * This function ensures that users have access to
 * real time live data by clearing the cache for a
 * reset when the data in the cache becomes stale
 * this function should be invoke each time a
 * post/put/patch request is made
 */
module.exports.clear = (req, res, next) => {
    cache.keys(function(err, keys) {
        if (!err) {
            let resourceUrl = req.baseUrl;
            const resourceKeys = keys.filter(k => k.includes(resourceUrl));
            cache.del(resourceKeys);
        }
    });
    return next();
}