const puppeteer = require("puppeteer");

class AttestationGeneratorService {
  constructor(config) {
    this.config = config;
  }

  async exec(formData) {
    await this._init();
    await this._prepareDownload();
    await this._submitForm(formData);
    await this._afterExec();
  }

  async _init() {
    console.log("launch browser");
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    console.log("open page");
    await this.page.goto(this.config.pageUrl);
  }

  async _afterExec() {
    console.log("exit");
    await this.browser.close();
  }

  async _submitForm(formData) {
    console.log("fill form");
    await this.page.type(
      this.config.profileSelectors.firstname,
      formData.firstname
    );
    await this.page.type(
      this.config.profileSelectors.lastname,
      formData.lastname
    );
    await this.page.type(
      this.config.profileSelectors.birthday,
      formData.birthday
    );
    await this.page.type(
      this.config.profileSelectors.placeofbirth,
      formData.placeofbirth
    );
    await this.page.type(
      this.config.profileSelectors.address,
      formData.address
    );
    await this.page.type(this.config.profileSelectors.city, formData.city);
    await this.page.type(
      this.config.profileSelectors.zipcode,
      formData.zipcode
    );
    await this.page.type(this.config.profileSelectors.date, formData.date);
    await this.page.type(
      this.config.profileSelectors.heuresortie,
      formData.heuresortie
    );
    await (
      await this.page.$(this.config.reasonsSelectors.sportAnimaux)
    ).click();
    console.log("submit form");
    await (await this.page.$(this.config.submitSelector)).click();
    console.log("downloading...");
    return this.page.waitFor(5000);
  }

  async _prepareDownload() {
    console.log("prepare download");
    const client = await this.page.target().createCDPSession();
    return client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: this.config.tmpFolder,
    });
  }
}

module.exports = AttestationGeneratorService;
