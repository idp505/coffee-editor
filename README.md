# Coffee Editor IDE

An **example** of how to build the Theia-based tools including graphical editos, form-based editors, tree-based editors, textual DSLs, model analyisis, debugging and more. The coffee editor is part of the [emf.cloud](https://www.eclipse.org/emfcloud/) project.
Please visit the [emf.cloud home page](https://www.eclipse.org/emfcloud/#coffeeeditoroverview) for an overview of all features and an [online live demonstration](https://eclipsesource.com/coffee-editor)!

If you have questions, contact us on our [discussions page](https://github.com/eclipse-emfcloud/emfcloud/discussions)
and have a look at our [communication and support options](https://www.eclipse.org/emfcloud/contact/).

![Alt text](workflow.png?raw=true)

## Project Structure

The coffee-editor consists of a frontend and a backend.

The frontend is located in the `web/` folder and frontend specific documentation can be found in the [frontend README](web/README.md)
The backend is located in the `backend/` folder and backend specific documentation can be found in the [backend README](backend/README.md)

## Used Projects

We are relying on a bunch of projects:

- https://github.com/eclipsesource/jsonforms
- https://github.com/eclipse-glsp/glsp
- https://github.com/eclipse-emfcloud/emfcloud-modelserver
- https://github.com/eclipse-emfcloud/emfcloud-modelserver-theia
- https://github.com/eclipse-emfcloud/theia-tree-editor

If you encounter issues please report them in the corresponding project.
This project should not contain much code and should mostly consist of 'glue' code to combine the different components.

## Prerequisites

### Java

You need Java 11 to build the Coffee Editor.

### Install [nvm](https://github.com/creationix/nvm#install-script)

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

### Install npm and node

    nvm install 12
    nvm use 12

### Install yarn

    npm install -g yarn

### Install maven

Please check the installation documentation for [maven](http://maven.apache.org/install.html).

On Ubuntu you can use:
`sudo apt-get install maven`

### Install linux packages (if necessary)

    sudo apt-get install g++-4.8 libsecret-1-dev xvfb libx11-dev libxkbfile-dev libxml2-utils

### Install python (needed from theia dependencies)

Please check the installation description [here](https://github.com/nodejs/node-gyp#installation).

On Windows the most reliable way seems to be to install Python and set `npm config set python "C:\Path\To\python.exe"`.

## Getting started

Clone and build the coffee-editor:

    git clone https://github.com/eclipsesource/coffee-editor.git
    cd coffee-editor
    ./run.sh

Run the built coffee-editor:

    ./run.sh -r

Open http://localhost:3000 in the browser.

In Theia open the example workspace `backend/examples/SuperBrewer3000` and double click a `.coffee` file. This opens it in a tree master detail editor.

## The build and run script

The `run.sh` script provides funtionality to build the coffee-editor, download used libraries, and run the IDE.
Every part step can be executed independently from each other by using the corresponding paramater:

`-b`: Builds the backend services

`-c`: Integrates the built backend artifacts in the coffee-editor IDE

`-f`: Builds the frontend shown in the web browser

`-r`: Runs the coffee-editor and exposes it at http://localhost:3000

## Debug the application

### Debug Backend

- Install Eclipse
- Import projects from `backend`
- Set target `org.eclipse.emfcloud.coffee.target.target`
- All backend applications are bundles as eclipse products and can be found in `org.eclipse.emfcloud.coffee.product`

#### Code Generation

To debug the code generation you would need to attach to the process when it is started from the backend.
Alternatively you can run the `codegen.product` or `codegen_cpp.product` with the correct parameters.

#### Workflow Analyzer

In order to debug, start the `workflowanalyzer.product` product in debug mode. The root application is : `org.eclipse.emfcloud.coffee.workflow.analyzer.application.application`.

Please make sure to set the `--WF_ANALYZER=5083` parameter to the browser app. In the backend you need to pass `-port` and `-host` with parameters as application arguments.

You can also simply use the predefined `WorkflowAnalyzerServer.launch` run config.

#### Workflow DSL

In order to debug, start the `workflowdsl.product` product in debug mode.
Please make sure to add `--WF_LSP=5017` parameter to the browser app. In the backend you need to pass `-startSocket` as an application argument.

You can also use the predefined `RunSocketServer-Headless.launch` run config.

#### Coffee Model Server

Use the `org.eclipse.emfcloud.coffee.modelserver.app.application` Eclipse Application or the corresponding `modelserver.product` from `org.eclipse.emfcloud.coffee.product` to start the Model Server.

#### Coffee GLSP Server

To run the GLSP Server, create an Eclipse Application configuration. In the section "Run a product", select `org.eclipse.emfcloud.coffee.workflow.glsp.server.app.product`.
Also, on the client side, you will have to set the `isRunning` flag of the [CoffeeGlspLaunchOptions](web/coffee-server/src/node/backend-module.ts) to `true`.

### Debug Frontend

- Install VSCode
- Import projects from `web`

#### Debug Theia Backend

Use the `Launch Browser Backend` launch config inside VSCode.

#### Debug Theia Frontend

Use the `Launch Browser Frontend` launch config inside VSCode. This will open Chrome and attach a debug listener.

## Example Branches

This project's repository has branches prefixed with `examples/` that serve to demonstrate common use cases of expansion or customization of
the capabilities of the frameworks on which the Coffee Editor is based. Each of these comprises a single commit that can be compared with its
base to see the changes from end to end that accomplish some developer use case. Often these examples will cross-cut the whole Coffee Editor
technology stack, but some will have a smaller focus. It all depends on the use case. The names of these branches are succinct but descriptive
of the use cases that they illustrate.

Because these examples are branches and not integrated into the main-line, they will be based on some past commit in the history of the
project. It is strongly encouraged when contributing changes to the Coffee Editor that, where such changes would meaningfully impact a use
case that is manifest in one of these example branches, that such example branch be rebased and updated as a part of that contribution.
Thus it is important that users of these example branches not base their own work on them (in git terms) because they **will be force-pushed**
from time to time, rewriting their history to rebase them on more recent baselines of the Coffee Editor.
