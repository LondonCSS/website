const fs = require("fs");
const util = require("util");
const path = require("path");
const http = require("http");
const sharp = require("sharp");
const puppeteer = require("puppeteer");
const handler = require("serve-handler");
const mkdirp = require("mkdirp")

const readFile = util.promisify(fs.readFile);
const savePath = path.join(__dirname, "../dist/static/events");
const browserOpts = {
  args: ["--enable-experimental-web-platform-features"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 }
};
const serverOpts = {
  port: 5000,
  dir: "dist"
};

async function makeThumbnail(path, width) {
  const img = await readFile(path);
  await sharp(img)
    .resize({ width })
    .toFile(path);
}

async function grabScreenshots() {
  try {
    mkdirp.sync(savePath);

    const browser = await puppeteer.launch(browserOpts);
    const page = await browser.newPage();
    await page.goto(
      `http://localhost:${serverOpts.port}/events/puppeteer.html`,
      {
        waitUntil: "networkidle0"
      }
    );

    const nodes = await page.$$("[data-event]");
    for (const node of nodes) {
      const event = await page.evaluate(
        link => link.getAttribute("data-event"),
        node
      );
      const path = `${savePath}/${event}.png`;

      await node.screenshot({ path });
      await makeThumbnail(path, 495 * 2);
    }

    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

const server = http.createServer((request, response) => {
  return handler(request, response, { public: serverOpts.dir });
});

server.listen(serverOpts.port, async () => {
  await grabScreenshots();
  process.exit();
});
