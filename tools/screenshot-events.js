const fs = require("fs");
const util = require("util");
const path = require("path");
const puppeteer = require("puppeteer");

const mkdirp = util.promisify(require("mkdirp"));
const readFile = util.promisify(fs.readFile);

const htmlPath = path.join(__dirname, "../dist/events/index.html");
const savePath = path.join(__dirname, "../dist/static/events");

async function grabScreenshots() {
  try {
    await mkdirp(savePath);

    const html = await readFile(htmlPath, "utf8");
    const browser = await puppeteer.launch({
      args: ["--enable-experimental-web-platform-features"]
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.setContent(html);
    
    const nodes = await page.$$("[data-event]");
    let count = 0;

    for (const node of nodes) {
      // const id = node.getAttribute("data-event");
      // console.log(node);
      
      await node.screenshot({ path: `${savePath}/event-${++count}.png` });
    }

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = grabScreenshots();
