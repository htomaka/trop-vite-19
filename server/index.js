const puppeteer = require('puppeteer');
const dateFormat = require('dateformat');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const profileSelectors = {
    firstname: '#field-firstname',
    lastname: '#field-lastname',
    birthday: '#field-birthday',
    placeofbirth: '#field-placeofbirth',
    address: '#field-address',
    city: '#field-city',
    zipcode: '#field-zipcode',
    date: '#field-datesortie',
    heuresortie: '#field-heuresortie'
};

const reasonsSelectors = {
    enfant: '#checkbox-enfants',
    travail: '#checkbox-travail',
    achats: '#checkbox-achats',
    sante: '#checkbox-sante',
    famille: '#checkbox-famille',
    handicap: '#checkbox-handicap',
    sportAnimaux: '#checkbox-sport_animaux',
    convocation: '#checkbox-convocation',
    mission: '#checkbox-missions',
}

const submitSelector = '#generate-btn';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://media.interieur.gouv.fr/deplacement-covid-19/');
        console.log('page loaded');

        const now = new Date();
        const formData = {
            firstname: 'Honoré',
            lastname: 'Tomaka',
            birthday: '26/02/1981',
            placeofbirth: 'Roubaix',
            address: '44, rue Gustave Scrive',
            city: 'La Madeleine',
            zipcode: '59110',
            date: dateFormat(now, 'dd/mm/yyyy'),
            heuresortie: dateFormat(now, 'hh:MMTT')
        }

        console.log('fill form');
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
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: path.resolve(__dirname, './downloads')
        });
        console.log("submit form")
        await (await page.$(submitSelector)).click();
        console.log("preparing download");
        await page.waitFor(5000);
        console.log('download success, close page');
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
