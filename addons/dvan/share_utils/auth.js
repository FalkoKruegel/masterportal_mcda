import config from "../config.json";

const tokens = {
    jwt: undefined
};

/**
 * fetch with token
 * @param {string} path fetch url
 * @param {*} options fetch options
 * @returns {*} promise
 */
async function fetch_auth (path, options) {
    if (isTokenExpired()) {
        await refreshToken();
    }
    if (tokens.jwt === undefined) {
        location.reload();
    }
    if (Object.hasOwn(options, "headers")) {
        options.headers.Authorization = `Bearer ${tokens.jwt}`;
    }
    else {
        options.headers = {
            "Authorization": `Bearer ${tokens.jwt}`
        };
    }
    return fetch(path, options);
}

/**
 * refreshs token
 * @returns {void}
 */
async function refreshToken () {
    tokens.jwt = undefined;
    const response = await fetch(config.auth_url + "/refresh_token", {method: "GET"});

    if (response.status === 200) {
        const data = await response.json();

        tokens.jwt = data.token;
    }
}

/**
 * checks if token is expired
 * @returns {boolean} true if expired
 */
function isTokenExpired () {
    const token = tokens.jwt;

    if (token === undefined) {
        return true;
    }
    const obj = JSON.parse(atob(token.split(".")[1]));
    const exp = obj.exp;
    const now = Math.floor(Date.now() / 1000) + 10;

    return exp <= now;
}

export {fetch_auth};
