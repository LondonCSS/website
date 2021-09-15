const pkg = require("../../package.json");

const urls = {
  production: process.env.URL,
  "deploy-preview": process.env.DEPLOY_PRIME_URL,
  "branch-deploy": process.env.DEPLOY_URL
};
const rootUrl = urls[process.env.CONTEXT] || pkg.homepage;
const currentYear = new Date().getFullYear()
const shortYear = String(currentYear).substr(2)

module.exports = {
  rootUrl,
  currentYear,
  shortYear,
  socialmedia: [
    {
      href: "mailto:hello@londoncss",
      icon: "email",
      label: "Email"
    },
    {
      href: "https://twitter.com/londoncss",
      icon: "twitter",
      label: "Follow"
    },
    {
      href: "https://github.com/LondonCSS/website",
      icon: "github",
      label: "Source"
    }
  ],
  wallpapers: [
    { title: "Supermannerist", id: "bXBywv", url: "supermannerist" },
    { title: "Truchet Tiles", id: "KLvmOG", url: "truchet" },
    { title: "Waves", id: "Lojyvp", url: "waves" }
  ]
};
