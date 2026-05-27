# CRediT Maker

<p align="center"><img src="./src/images/robot-logo128.png"></p>

CRedit Maker helps you to create CRediT (Contributor Roles Taxonomy) statements for your research papers.
To learn more about CRediT, visit the [CRediT website](https://credit.niso.org/).

<p align="center"><img src="screenshot.png"></p>

> [!TIP]
> Link to hosted version:
> [https://andreas-bauer.github.io/credit-maker/](https://andreas-bauer.github.io/credit-maker/)

## Getting started

First, install the dependencies:

```bash
npm install
```

After that, run the development server:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173) with your browser to use it.

## How to add new output formats

Have a look at `./src/credit/generator.js` and add your new generator function that creates a new output format.
Then handle the new generator function in the `generateOutput()` function and within the `generatorStyles` object in the `./src/index.html`.

## Build in Docker container

You can create the build of the static page inside a Docker container by running:

```sh
make docker
```

The generated files will be placed in the `dist/` folder.

## License

Copyright © 2024-2026 Andreas Bauer

This work (source code) is licensed under [MIT](./LICENSE).
