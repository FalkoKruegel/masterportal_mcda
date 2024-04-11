const auth_url = window.location.origin;

async function addLoadable(parent, element) {
    return new Promise((resolve) => {
        element.addEventListener("load", () => {
            resolve();
        });
        parent.appendChild(element);
    });
}

async function loadMasterportal() {
    // replace content with masterportal items
    const root = document.querySelector("#root");
    if (root !== null) {
        root.remove();
    }
    // add masterportal styles
    const style = document.createElement("link")
    style.rel = "stylesheet";
    style.href  = "./css/masterportal.css";
    await addLoadable(document.head, style);
    // create masterportal-root
    const masterportal_root = document.createElement("div")
    masterportal_root.id = "masterportal-root";
    document.body.appendChild(masterportal_root);
    // create loader
    const loader = document.createElement("div")
    loader.id = "loader";
    loader.className = "centered-box-wrapper loader-is-loading loader-is-initially-loading";
    loader.innerHTML = `
        <div class="centered-box-content">
            <div id="portal-logo-box">
                <img id="portal-logo" src="./img/TUD_Logo_Blau.svg" />
                <div id="portal-logo-main-title">DVAN Entscheidungsunterstützung</div>
                <div id="portal-logo-sub-title">Prototyp - Entwicklungsstadium</div>
            </div>
            <div id="loader-spinner-itself" class="default"></div>
        </div>
    `;
    document.body.appendChild(loader);
    // load masterportal script
    const script = document.createElement("script");
    script.src = "./js/masterportal.js";
    await addLoadable(document.body, script);
}

async function isLoggedIn() {
    const response = await fetch(auth_url+"/is_logged_in", {method: "GET"});
    const data = await response.json();
    console.log(data)
    return data.is_logged_in;
}

const root = document.querySelector("#root");
const username = document.querySelector("#user-input");
const password = document.querySelector("#password-input");
const form = document.querySelector("#login-form");
if (!await isLoggedIn()) {
    root.style.visibility = 'visible';
    let pr = new Promise((resolve, reject) => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const response = await fetch(auth_url+"/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                })
            });
            if (response.status === 200) {
                const data = await response.json();
                resolve();
            } else {
                username.value = "";
                username.className = "invalid";
                const f1 = () => {
                    username.className = "";
                    username.removeEventListener("input", f1);
                };
                username.addEventListener("input", f1);
                password.value = "";
                password.className = "invalid";
                const f2 = () => {
                    password.className = "";
                    password.removeEventListener("input", f2);
                };
                password.addEventListener("input", f2);
            }
        });
    });
    await pr;
    root.style.visibility = "hidden";
}
// load all masterportal components
await loadMasterportal();

export {}