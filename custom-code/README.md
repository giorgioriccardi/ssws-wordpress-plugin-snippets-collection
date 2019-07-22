## Job # and Project name

### Description:
* Project description goes here

### Specs:
* Browser support:
  * Latest version of Chrome, Firefox, Opera, and Safari
  * IE 11 and up
  * iOS Safari (latest version)
  * Latest versions of Android Chrome, Firefox, and Opera

### Environment and Tools:
Source code and resources are version controlled using `git`. We use `gitlab` (`gitlab.com`) as a git repository hosting and code review/management service.

We'll be using `Gulp` to configure and build the project.  Before starting, run the following:

```
% npm install
% bower install
% scripts/update-env.py
```
Note: project needs to be in gitlab in order for `scripts/update-env.py` to work.


Do not commit the `bower_components` and `node_modules` folders.

#### For development
Run:
```
% gulp serve
```
This will generate a local environment that refreshes the browsers when changes are made.  Note that it will compile your scss and javascript into a `.tmp` folder which you should not commit.  Use `CTRL + c` to stop the server.


#### For staging/production
The code must be compiled before it goes to staging/production.  There are two ways you can create production ready code:

This will create production ready code and generate a local environment so you can see it:
```
% gulp serve:dist
```

Use `CTRL + c` to stop the server.

If you just want to compile the code, you can just run this:
```
% gulp build
```
In both cases, code will be compiled into the **dist** folder and this is what wil be on staging.

#### Coding standards
All developers must follow the coding standards outlined [here](https://sites.google.com/s/0B8DVJJiqXFewanpBSDFHSGN3Q2s/p/0B8DVJJiqXFewWTJBenMwcDZWWkk/edit)

To enforce these standards, developers **must** have the following installed in `Atom`:
* [editorconfig](https://atom.io/packages/editorconfig)
* [sass lint](https://atom.io/packages/linter-sass-lint)
* [eslint](https://atom.io/packages/linter-eslint)
* [docblockr](https://atom.io/packages/docblockr)

Packages that are helpful, but not required:
* [pigments](https://atom.io/packages/pigments)

### Workflow
As mentioned above, code is versioned using git. We use a single-branch continuous integration model, with integration done on the `master` branch. In more detail, a given feature or fix will be done on a feature branch (e.g. `feature/TOURISM-123-add-top-menu`) branched from master. When the branch is ready to be reviewed, a merge request is made using gitlab. Comments and changes are made within the merge request, which is finally accepted to merge the code into master. In rare cases, a merge request may be rejected, if the feature is no longer required, or a better solution is found.

### CI/CD Details

#### Environments:

You can view deployment from `Pipelines` -> `Environments`

* `production` (live site): production is deployed automatically when changes to `master` get merged.
  * `master` -> `doCIRunners-demo` -> `registry.gitlab.com/front-end-projects/project-name:latest` (auto deploy) -> `doCDDev-demo` (http://project.url/)

#### Required Files (Copy and modify from an existing project):

* .gitlab-ci.yml
* Dockerfile
* default.conf
* deploy.sh (make sure `chmod +x`)

#### Secret Variables:

Set these variables in the project's settings (`Settings` -> `CI/CD Pipelines`) using the information stored in the Tech Ops doc.

* `SSH_PRIVATE_KEY`: _xxxxx_
* `SSH_SERVER_HOSTKEYS`: _xxxxx_
* `SSH_DEV_SERVER_IP`: _XXX.XXX.XXX.XXX_

#### Runners

In the project's settings,

* Disable shared Runners for this project
* Enable `Docker CI/CD Demo Runner` for this project

#### Slack Notifications

1. Click `Slack notifications` in the project's settings (`Settings` -> `Integrations`)
2. Check the `Active` checkbox to turn on the service
3. Enter:
  * `Webhook`:  Create the webhook then replace this line with the url
  * `Username`: gitlab
4. Uncheck the `Notify only broken pipelines`
