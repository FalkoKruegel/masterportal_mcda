const auth_url = window.location.origin;

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
    let opt = options;

    if (opt === undefined) {
        opt = {};
        opt.headers = {
            "Authorization": `Bearer ${tokens.jwt}`
        };
    }
    else if (Object.hasOwn(opt, "headers")) {
        opt.headers.Authorization = `Bearer ${tokens.jwt}`;
    }
    else {
        opt.headers = {
            "Authorization": `Bearer ${tokens.jwt}`
        };
    }
    return fetch(path, opt);
}

/**
 * refreshs token
 * @returns {void}
 */
async function refreshToken () {
    tokens.jwt = undefined;
    const response = await fetch(auth_url + "/refresh_token", {method: "GET"});

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
