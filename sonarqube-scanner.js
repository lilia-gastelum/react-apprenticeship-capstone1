const scanner = require('sonarqube-scanner');
scanner(
    {
        serverUrl: 'http://localhost:9000',
        token: '468bf7be55f406ad422712d6c2c31459594627c9',
        options: {
            'sonar.sources': './src',
            'sonar.exclusions': '**/*.test.tsx',
            'sonar.tests': './src',
            'sonar.test.inclusions': '**/*.test.js,**/*test.js',
            'sonar.typescript.lcov.reportPaths': 'coverage/lcov.info',
            'sonar.testExecutionReportPaths': 'test-report.xml',
        },
    },
    () => process.exit()
)