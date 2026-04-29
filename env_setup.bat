rmdir /s /q allure-results
rmdir /s /q test-results
npm install
npm install -D allure-playwright
npm install -g allure-commandline --force
npx playwright install