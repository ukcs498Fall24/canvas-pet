# Canvas Pet

This is a browser extension built for our CS 498 project. Canvas Pet will 

## Getting Started

Before you can run it
Install [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) and [pnpm](https://pnpm.io/installation) then [clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and run `pnpm install`

> I highly suggest getting VSCode or some other editor to work with the code

First, run the development server:

```bash
pnpm dev
```

Open your browser and load the appropriate development build by [loading the unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked). For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

Once you have loaded the extension it should show up in your extensions menu just like any other browser extension. Navitage to UK's canvas page to see your Canvas Pet!

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

