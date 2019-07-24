## Linter files

### Description:
* This repo should contain the latest version of all the linters we are using for front end projects.

`.editorconfig` - used for code formatting for Atom editor.

`.eslintrc` - use for javascript standards and used in conjunction with [gulp-eslint](https://www.npmjs.com/package/gulp-eslint).

`.sass-lint.yml` - used for sass standards and used in conjunction with [gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint).

It also contains a file `.pre-commit-config.yml` to configure the `pre-commit` framework for managing and running git pre-commit hooks.

The files in this repo are injected into other projects via a script in those projects.


### How to use this:
1. If there needs to be a change in the linters, it should be done here.

2. The script scripts/update-env.py can be run at any time to update the configuration files and so on to the latest from the repo.

