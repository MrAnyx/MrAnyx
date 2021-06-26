import fs from "fs";
import axios from "axios";

const fetchFeed = async () => {
    const feedRequest = await axios(`${(process.argv.slice(2)[0])}`);
    return feedRequest.data.posts;
}

const updateFeed = async () => {
    try {
        const readme = fs.readFileSync("./README.md", "utf8");

        const milestone = "<!-- Update feed milestone -->";

        let readmePart1 = readme.split(milestone)[0];
        let readmePart2 = readme.split(milestone)[2];

        const feed = await fetchFeed();
        const articlesTitle = "## Last posts";
        let updatedReadme = "<!-- Update feed milestone -->\n" + readmePart1 + "\n" + articlesTitle;

        feed.forEach(item => {
            updatedReadme += `\n- [${item.title}](${item.url})`;
        })

        updatedReadme += "\n<!-- Update feed milestone -->" + readmePart2;

        fs.writeFileSync("./README.md", updatedReadme);
    } catch (error) {
        console.error(error);
    }
}

updateFeed()