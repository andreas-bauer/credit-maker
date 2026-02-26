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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to add new output formats

All generator functions are located in `./src/lib/credit/` and follow the type defined in `./src/lib/credit/generator.ts`.
New output format generators need to be listed in `./src/app/page.tsx` within the `availableStyles` object along with a short description.

## Build in Docker container

You can create the build of the static page inside a Docker container by running:

```sh
make docker
```

## License

Copyright © 2024-2025 Andreas Bauer

This work (source code) is licensed under [MIT](./LICENSE).
