'use strict';

const { After, Status, setDefaultTimeout } = require('cucumber');
const fs = require('fs');

setDefaultTimeout(TIMEOUT.xl * 20);

After(testCase => {
    if (testCase.result.status === Status.FAILED) {

        const fileName = `${testCase.pickle.name} ${new Date().getTime()}`,
            logsFilePath = `./artifacts/logs/${fileName}.json`,
            screenDirPath = './artifacts/screenshots',
            screenFilePath = `${screenDirPath}/${fileName}.png`;

        return browser.driver.manage().logs().getAvailableLogTypes()
            .then(logs => {
                logs.forEach(log => {
                    return browser.driver.manage().logs().get(log)
                        .then(data => {
                            if (data.length) {
                                return fs.writeFile(logsFilePath, JSON.stringify(data, null, ' '), err => {
                                    if (err) {
                                        throw new Error(err);
                                    }
                                });
                            }
                        });
                });
            })
            .then(() => browser.takeScreenshot())
            .then(screenShot => {
                fs.existsSync(screenDirPath) || fs.mkdirSync(screenDirPath);
                const decodedImage = new Buffer(screenShot, 'base64');
                let stream = fs.createWriteStream(screenFilePath);
                stream.write(new Buffer(screenShot, 'base64'));
                stream.end();
                return this.attach(decodedImage, 'image/png');
            })
            .catch(err => {
                throw new Error(err)
            });
    }
});
