import store from "/src/app-store";
import config from "../../../config.json";
import {fetch_auth} from "../../../share_utils/auth";

const bar_options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
const scatter_options = {
    scales: {
        x: {
            type: "linear",
            position: "bottom"
        }
    }
};

/**
 * Loads statistic 1
 * @returns {Promise<void>} empty promise
 */
async function loadStatistic1 () {
    const stepEight = store.getters["Tools/DecisionSupport/stepEight"];

    if (stepEight.statistics.a.data === null || stepEight.statistics.a.options === null) {
        stepEight.statistics.a.loading = true;

        const response = await fetch_auth(config.backend_url + "/v1/decision_support/analysis/stat_1", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({})
        });
        const content = await response.json();
        const data = {
            labels: content.labels,
            datasets: [
                content.dataset
            ]
        };

        stepEight.statistics.a.data = data;
        stepEight.statistics.a.options = bar_options;

        stepEight.statistics.a.loading = false;
    }
}

/**
 * Loads statistic 2
 * @returns {Promise<void>} empty promise
 */
async function loadStatistic2 () {
    const stepEight = store.getters["Tools/DecisionSupport/stepEight"];

    if ((stepEight.statistics.b.data === null || stepEight.statistics.b.options === null) && stepEight.statistics.b.facility !== null) {
        stepEight.statistics.b.loading = true;

        const response = await fetch_auth(config.backend_url + "/v1/decision_support/analysis/stat_2", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                facility: stepEight.statistics.b.facility
            })
        });
        const content = await response.json();
        const data = {
            labels: content.labels,
            datasets: [
                content.dataset
            ]
        };

        stepEight.statistics.b.data = data;
        stepEight.statistics.b.options = bar_options;

        stepEight.statistics.b.loading = false;
    }
}

/**
 * Loads statistic 3
 * @returns {Promise<void>} empty promise
 */
async function loadStatistic3 () {
    const stepEight = store.getters["Tools/DecisionSupport/stepEight"];

    if ((stepEight.statistics.c.data === null || stepEight.statistics.c.options === null) && stepEight.statistics.c.facility !== null) {
        stepEight.statistics.c.loading = true;

        const response = await fetch_auth(config.backend_url + "/v1/decision_support/analysis/stat_3", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({
                facility: stepEight.statistics.c.facility
            })
        });
        const content = await response.json();
        const data = {
            labels: content.labels,
            datasets: [
                content.dataset
            ]
        };

        stepEight.statistics.c.data = data;
        stepEight.statistics.c.options = bar_options;

        stepEight.statistics.c.loading = false;
    }
}

/**
 * Loads hotspot analysis
 * @returns {Promise<void>} empty promise
 */
async function loadHotspot () {
    const stepEight = store.getters["Tools/DecisionSupport/stepEight"];

    if (stepEight.hotspot.data === null || stepEight.hotspot.options === null) {
        stepEight.hotspot.loading = true;

        const response = await fetch_auth(config.backend_url + "/v1/decision_support/analysis/hotspot", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({})
        });
        const content = await response.json();
        const data = {
            datasets: [
                content
            ]
        };

        stepEight.hotspot.data = data;
        stepEight.hotspot.options = scatter_options;

        stepEight.hotspot.loading = false;
    }
}


export {loadStatistic1, loadStatistic2, loadStatistic3, loadHotspot};
