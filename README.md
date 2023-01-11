## Lendsqr lending app

To get this project running on your machine, follow the steps below:

### Install Node.js and NPM

1.  Visit [Nodejs.org](https://nodejs.org/en/download/) and download the latest LTS node.js
2.  Install Node.js on your machine and make sure it is added to path.
3.  Open your **Command Prompt** or **Terminal** and run the commands below:

```
node --version
```

This will display **v16.14.0** or similar (preferably the latest version).

```
npm --version
```

This will display **8.1.1** or similar.

**NB:** if the above command does not work, reinstall Node.js by following this [tutorial](https://www.youtube.com/watch?v=JINE4D0Syqw)

## Project Setup

### Package Installation

To setup the project running, navigate to the project directory after cloning it via **Command Prompt** or **Terminal** and run the command below:

```
npm install
```

### Env Variables

Rename the **.env.example** at the root directory to **.env**

### Start Development Server

Run the command:

```
npm run dev
```

### Build for Production

Run the command:

```
npm run build <typescript compilation/build up>
```

### For proper documentation of the API (in dev mode while the app is running), go to http://localhost:<port>/api-docs to see the full documentation

