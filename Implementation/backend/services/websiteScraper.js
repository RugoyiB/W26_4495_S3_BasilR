const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://www.berea.ca";

const pages = [
    { title: "Home", url: "/" },
    { title: "About Us", url: "/about" },
    { title: "Our Team", url: "/about/our-team" },
    { title: "I'm New", url: "/about/im-new" },
    { title: "Our Beliefs", url: "/about/our-beliefs" },
    { title: "Events", url: "/events" },
    { title: "Ministries", url: "/ministries" },
    { title: "News", url: "/news" }
];

const loggedFailures = new Set();

function logOnce(message) {
    if (!loggedFailures.has(message)) {
        console.warn(message);
        loggedFailures.add(message);
    }
}

async function scrapePage(title, url) {
    try {
        const response = await axios.get(BASE_URL + url, { timeout: 10000 });
        const $ = cheerio.load(response.data);

        const text = $("body").text().replace(/\s+/g, " ").trim();

        if (!text || text.length < 100) {
            throw new Error("Insufficient content");
        }

        return `\n\n### ${title}\n${text}`;

    } catch (error) {
        logOnce(`Failed to scrape ${title}`);
        return "";
    }
}

async function fetchAllChurchContent() {
    let content = "";

    for (const page of pages) {
        const pageContent = await scrapePage(page.title, page.url);
        content += pageContent;
    }

    return content.trim();
}

module.exports = { fetchAllChurchContent };
