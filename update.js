import fs from "fs";
import axios from "axios";

const fetchFeed = async () => {
    const feedRequest = await axios("https://needlify.com/api/github/posts/get");
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
        let updatedReadme = readmePart1 + "\n" + milestone + "\n" + articlesTitle;

        feed.forEach(item => {
            updatedReadme += `\n- [${item.title}](${item.url})`;
        })

        updatedReadme += "\n" + milestone + readmePart2;

        fs.writeFileSync("./README.md", updatedReadme);
    } catch (error) {
        console.error(error);
    }
}

updateFeed()