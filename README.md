# Test Automation training from jaktestowac.pl

## Links

- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
  if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- run Trace Viewer on zip file  
  `npx playwright show-trace trace.zip`
- cancelling Node process  
  hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>
- run tests in one dir
  `npx playwright test tests/[test file]`

  ## Updating Playwright
  - check if Playwright should be updated  
    `npm outdated @playwright/test`
  - update Playwright  
    `npm i @playwright/test`
  - update browsers  
    `npx playwright install`
  - verify Playwright version  
    `npx @playwright/test --version`

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox

  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

  ## Visual Studio Code
  - Preview: for README.md
  - Autosave: in File -> Auto Save
  - TimeLine: file context menu
  - Formatting: Shift+Alt+F
  - Copying line above: Alt+Shift+Down Arrow

## Playwright snippets

- test:
  ```javascript
  test('test description', async ({ page }) => {});
  ```
- describe:

  ```javascript
  test.describe('Group description', () => {});
  ```

- running one test: `test.only`

## Prittier

- install:  
  `npm install --save-dev --save-exact prettier`
- new files:

  .prettierignore (new lines: package-lock.json, playwright-report)

  .prettierrc.json

```javascript
 { "singleQuote": true }
```

- run Prettier  
  `npx prettier --writer .`
