"use strict";

const {After, Before, Status, setDefaultTimeout} = require('cucumber');
const fs = require('fs');

setDefaultTimeout(TIMEOUT.xl * 20);

After(function (testCase) {
    if (testCase.result.status === Status.FAILED) {

        const fileName = `${testCase.pickle.name} ${new Date().getTime()}`;

        browser.driver.manage().logs().getAvailableLogTypes().then(logs => {
            
            const logsFilePath = `./artifacts/logs/${fileName}.json`;

            logs.forEach(log => {
                browser.driver.manage().logs().get(log).then(data => {
                    if (data.length !== 0) {
                        fs.writeFile(logsFilePath, JSON.stringify(data, null, ' '), err => {
                            if (err) {
                                throw new Error(err);
                            }
                        });
                    }
                });
            });
        }).catch(err => {throw new Error(err)});

        return browser.takeScreenshot().then(screenShot => {
            
            const screenDirPath = './artifacts/screenshots',
                screenFilePath = `${screenDirPath}/${fileName}.png`;

            fs.existsSync(screenDirPath) || fs.mkdirSync(screenDirPath);
            const decodedImage = new Buffer(screenShot, 'base64');    
            let stream = fs.createWriteStream(screenFilePath);
            stream.write(new Buffer(screenShot, 'base64'));
            stream.end();
            return this.attach(decodedImage, 'image/png');
        });
    }
});