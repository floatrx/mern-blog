# Playwright

### Inside that directory, you can run several commands:

Runs the end-to-end tests.

`yarn playwright test`

Starts the interactive UI mode.

`yarn playwright test --ui`

Runs the tests only on Desktop Chrome.

`yarn playwright test --project=chromium`

Runs the tests in a specific file.

`yarn playwright test example`

Runs the tests in debug mode.

`yarn playwright test --debug`

Auto generate tests with Codegen.

`yarn playwright codegen`

We suggest that you begin by typing:

`yarn playwright test`

And check out the following files:
- ./tests/example.spec.ts - Example end-to-end test
- ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
- ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨
