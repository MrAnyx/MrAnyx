import fs from "fs";
import axios from "axios";

const fetchFeed = async () => {
    const feedRequest = await axios("https://needlify.com/api/github/posts/get");
    return feedRequest.data.posts;
}

const updateFeed = async () => {
    try {
        const readme = fs.readFileSync("./README.md", "utf8");

        let readmePart1 = readme.split("## Last posts")[0];
        let readmePart2 = readme.split("## Last posts")[1].split("## Github Data Analysis")[1];

        const feed = await fetchFeed();
        let updatedReadme = readmePart1 + "## Last posts";

        feed.forEach(item => {
            updatedReadme += `\n- [${item.title}](${item.url})`;
        })

        updatedReadme += "\n## Github Data Analysis" + readmePart2;

        fs.writeFileSync("./README.md", updatedReadme);
    } catch (error) {
        console.log("Everything is up to date");
    }
}

updateFeed()