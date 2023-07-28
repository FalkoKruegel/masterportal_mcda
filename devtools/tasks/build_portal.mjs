import fs from "fs-extra";
import { exec as execute } from "child-process-promise";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import replace from "replace-in-file";

const __dirname = dirname(fileURLToPath(import.meta.url)),
    rootPath = path.resolve(__dirname, "../../"),
    distPath = path.resolve(rootPath, "dist/"),
    buildTempPath = path.resolve(distPath, "build/");


function replaceStrings(destination) {
    const replacements = [
        {
            "files": destination + "/index.html",
            "from": /\..\/..\/img\//g,
            "to": "./img/"
        },
        {
            "files": destination + "/index.html",
            "from": /\..\/..\/build\//g,
            "to": "./"
        },
        {
            "files": destination + "/css/masterportal.css",
            "from": /css\/woffs/g,
            "to": "./woffs"
        },
        {
            "files": destination + "/css/masterportal.css",
            "from": /url\s?\(\s?"\/img\//g,
            "to": "url(\"../img/"
        },
        {
            "files": destination + "/js/masterportal.js",
            "from": /\/img\/tools\/draw\/circle_/g,
            "to": "./img/tools/draw/circle_"
        },
        {
            "files": destination + "/js/masterportal.js",
            "from": /\..\/..\/img\//g,
            "to": "../img/"
        },
        {
            "files": destination + "/js/masterportal.js",
            "from": /\/locales/g,
            "to": "../locales"
        }
    ];

    replacements.forEach(function (replacement) {
        replace.sync({
            files: replacement.files,
            from: replacement.from,
            to: replacement.to
        });
    });
}

/**
 * start the build process with webpack
 * @param {Object} portal_path portal to build
 * @returns {void}
 */
async function build(portal_path) {
    const sourcePortalFolder = path.resolve(rootPath, portal_path),
        cliExecCommand = "npx webpack --config devtools/webpack.build.js";

    if (!fs.existsSync(sourcePortalFolder)) {
        console.error("---\n---");
        throw new Error("ERROR: PATH DOES NOT EXIST \"" + sourcePortalFolder + "\"\nABORTED...");
    }

    // console.warn("NOTICE: executing command \"" + cliExecCommand + "\"");
    console.warn("NOTICE: Building portals. Please wait...");

    try {
        await fs.remove(distPath);

        const result = await execute(cliExecCommand);
        console.warn(result.stdout);

        await fs.copy("./img", distPath + "/img");
        await fs.copy("./locales", distPath + "/locales");
        await fs.copy(buildTempPath, distPath);

        await fs.remove(buildTempPath);

        await fs.copy(sourcePortalFolder + "/", distPath);
        replaceStrings(distPath);
    } catch (error) {
        console.error(error);
    }
};

build("portal/test_portal");