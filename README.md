# Terminal Portfolio </>

<div align="center">

![Demo](https://raw.githubusercontent.com/shwet46/CLI-portfolio/main/demo.gif)

<p>Run <b><i>npx shwet46-portfolio</i></b> to see this on your terminal :)</p>

</div>

---

# Create Your Own Terminal Portfolio

Follow these steps to customize and deploy your own CLI portfolio.

---

## 1. Clone or Fork the Repository

You can either fork this repository or clone it locally.

```bash
git clone https://github.com/shwet46/CLI-portfolio.git
cd CLI-portfolio
npm install
```

---

## 2. Customize Your Portfolio Data

Update the `data.json` file with your personal information. This file controls most of the displayed content.

You can also modify `index.js` if you want to change the structure or style of the portfolio.

---
## 3. Change Package and Command Name

Open `package.json` and update the `name` and `bin` fields:

```json
{
  "name": "your-package-name",
  "version": "1.0.0",
  "bin": {
    "your-command-name": "./index.js"
  }
}
```

-   `name`: This will be the name of your package on npm.
-   `your-command-name`: This is the command users will run with `npx`, try to keep it same as package name.

For example:

```json
{
  "name": "shwet46-portfolio",
  "bin": {
    "shwet46": "./index.js"
  }
}
```

---

## 4. Test Locally

Run the following command inside your project to link your package locally:

```bash
npm link
```

Then you can test your command:

```bash
your-command-name
```

---

## 5. Publish to NPM

If you want others to be able to run your portfolio with `npx`, you'll need to publish it to npm.

### Login to npm

```bash
npm login
```

### Publish Package

```bash
npm publish
```

Once published, anyone can run your portfolio using:

```bash
npx your-package-name
```
or
```bash
npx your-command-name
```

---

#### Hope you liked this and created your own portfolio :)

## License

MIT License. See [LICENSE](LICENSE) file for details.
