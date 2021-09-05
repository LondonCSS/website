const fs = require("fs");
const util = require("util");
const path = require("path");

const puppeteer = require("puppeteer");
const sharp = require("sharp");
const mkdirp = require("mkdirp");

const readFile = util.promisify(fs.readFile);

const { wallpapers } = require("../src/_data/config");
const savePath = path.join(__dirname, "../static/wallpapers");

/**
 * @param {puppeteer.Browser} browser
 * @param {string} url
 */
async function screenshotPage(browser, url) {
  const page = await browser.newPage();
  const host = "http://localhost:8080";
  const pageUrl = `${host}/wallpapers/${url}/`;
  await page.goto(pageUrl, { waitUntil: "networkidle0" });

  console.log(`screenshotting ${pageUrl}`);

  await page.setViewport({ width: 3840, height: 2160, deviceScaleFactor: 2 });
  await page.screenshot({ path: `${savePath}/${url}-cinema.png` });

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.screenshot({ path: `${savePath}/${url}-desktop.png` });

  await page.setViewport({ width: 414, height: 744, deviceScaleFactor: 2 });
  await page.screenshot({ path: `${savePath}/${url}-mobile.png` });
}

/**
 * @param {string} url
 * @param {number} width
 */
async function thumbnailImage(url, width) {
  const pathIn = `${savePath}/${url}-desktop.png`;
  const pathOut = `${savePath}/${url}-thumbnail.png`;

  const img = await readFile(pathIn);

  await sharp(img).resize({ width }).toFile(pathOut);
}

async function grabScreenshots() {
  mkdirp.sync(savePath);

  const browser = await puppeteer.launch({
    args: ["--enable-experimental-web-platform-features"],
  });

  try {
    for (const { url } of wallpapers) {
      await screenshotPage(browser, url);
      await thumbnailImage(url, 1200);
    }
    await browser.close();
  } catch (err) {
    console.log(err);
  }
}

module.exports = grabScreenshots();
