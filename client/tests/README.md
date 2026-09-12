# Playwright

### Inside that directory, you can run several commands:

Runs the end-to-end tests.

`pnpm playwright test`

Starts the interactive UI mode.

`pnpm playwright test --ui`

Runs the tests only on Desktop Chrome.

`pnpm playwright test --project=chromium`

Runs the tests in a specific file.

`pnpm playwright test example`

Runs the tests in debug mode.

`pnpm playwright test --debug`

Auto generate tests with Codegen.

`pnpm playwright codegen`

We suggest that you begin by typing:

`pnpm playwright test`

And check out the following files:
- ./tests/example.spec.ts - Example end-to-end test
- ./tests-examples/demo-todo-app.spec.ts - Demo Todo App end-to-end tests
- ./playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨
