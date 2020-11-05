const puppeteer = require("puppeteer");
const path = require("path");
const {
  profileSelectors,
  reasonsSelectors,
  submitSelector,
} = require("./config");

async function generateAttestationService(formData) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://media.interieur.gouv.fr/deplacement-covid-19/");
    console.log("page loaded");
    console.log("fill form");
    await page.type(profileSelectors.firstname, formData.firstname);
    await page.type(profileSelectors.lastname, formData.lastname);
    await page.type(profileSelectors.birthday, formData.birthday);
    await page.type(profileSelectors.placeofbirth, formData.placeofbirth);
    await page.type(profileSelectors.address, formData.address);
    await page.type(profileSelectors.city, formData.city);
    await page.type(profileSelectors.zipcode, formData.zipcode);
    await page.type(profileSelectors.date, formData.date);
    await page.type(profileSelectors.heuresortie, formData.heuresortie);
    await (await page.$(reasonsSelectors.sportAnimaux)).click();

    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: path.join(__dirname, "tmp"),
    });
    console.log("submit form");
    await (await page.$(submitSelector)).click();
    console.log("preparing download");
    await page.waitFor(5000);
    console.log("download success");
    console.log("close page");
    return browser.close();
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  generateAttestation: generateAttestationService,
};
