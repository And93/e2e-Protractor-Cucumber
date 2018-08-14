const reporter = require('cucumber-html-reporter');

const options = {
        theme: 'bootstrap',
        jsonFile: './artifacts/reports/json/report.json',
        output: `./artifacts/reports/html/cucumber_report_${new Date().getTime()}.html`,
        reportSuiteAsScenarios: true,
        launchReport: false
    };
 
reporter.generate(options);