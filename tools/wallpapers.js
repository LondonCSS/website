const fs = require("fs");
const util = require("util");
const path = require("path");

const puppeteer = require("puppeteer");
const sharp = require("sharp");
const slugify = require("slugify");

const mkdirp = util.promisify(require("mkdirp"));
const readFile = util.promisify(fs.readFile);

const { wallpapers } = require("../src/_data/config");
const savePath = path.join(__dirname, "../dist/static/wallpapers");

async function screenshotPage(browser, id, title) {
  const slug = slugify(title);
  const page = await browser.newPage();
  await page.goto(`https://s.codepen.io/oliverturner/debug/${id}`, {
    waitUntil: "networkidle2"
  });

  await page.setViewport({ width: 3840, height: 2160, deviceScaleFactor: 2 });
  await page.screenshot({ path: `${savePath}/${slug}-cinema.png` });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.screenshot({ path: `${savePath}/${slug}-desktop.png` });

  await page.setViewport({ width: 414, height: 744, deviceScaleFactor: 2 });
  await page.screenshot({ path: `${savePath}/${slug}-mobile.png` });
}

async function thumbnailImage(id) {
  const pathIn = `${savePath}/${id}-desktop.png`;
  const pathOut = `${savePath}/${id}-thumbnail.png`;

  const img = await readFile(pathIn);

  await sharp(img)
    .resize({ width: 1200 })
    .toFile(pathOut);
}

async function grabScreenshots() {
  await mkdirp(savePath);
  const browser = await puppeteer.launch({
    args: ["--enable-experimental-web-platform-features"]
  });

  try {
    for (const { id, title } of wallpapers) {
      await screenshotPage(browser, id, title);
      await thumbnailImage(id);
    }
    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = grabScreenshots();
