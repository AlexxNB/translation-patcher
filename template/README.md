# SITE TRANSLATION

This is example template for the site translation project. Formaly it is just example of [Svelte site template](https://github.com/sveltejs/template) translation.

Run the `npm run das` command. It will cause next steps:

* example site's sources will be downloaded
* source files will be replaced by translated ones from `patch` directory
* dependencies will be installed


Then run `npm run dev` and the translated site will be started in development mode. Default URL for Svelte template is [localhost:5000](http://localhost:5000). Open it in the browser, then edit something in the `patch` directory and site will be updated automaticly.

When you will understand how it works, change `translation.config.json` file to start translate the site you need.

## Usage

There are a lot of npm-scripts for your translation process.

|Command|Description|
|-------|-----------|
|`npm run download`| Will download the original site source from the repository into the `__BUILD` directory. If the `__BUILD` directory already exists, it will be erased.|
|`npm run apply`|Apply the translation patch on original site sources.|
|`npm run setup`| Run installation script of the site, specified in config file.|
|`npm run das`| Shortcut for `download`,`apply` and `setup` scripts.|
|`npm run dsa`| Shortcut for `download`,`setup` and `apply` scripts.|
|`npm run dev`| Run the site in the development mode by command, specified in config file. The `patch` directory will be watched and any changes will be applied on the site.|
|`npm run build`| Run build script of the original site, specified in config file.|
|`npm run start`| Run start script of the original site, specified in config file.|


## Configuration

In the working directory you can find the *translation.config.json* file which contents is like this:

```json
{
    "lang": "ru",
    "repo": "https://github.com/sveltejs/template",
    "setup": "npm install",
    "dev": "npm run dev",
    "build": "npm run build",
    "start": "npm run start"
}
```

|Param|Description|
|-----|-----------|
|lang | The language of the project. Just for information, doesn't uses anywhere in translation process.|
|repo | Repository URL from the original site will be downloaded. You can also add subdirectory path: `https://github.com/author/somerepo/subdir/sitedir`. Repository can be on Github, Gitlub or Bitbucket.|
|setup | Command which will be run by `npm run setup` command.|
|dev | Command which will be run by `npm run dev` command.|
|build | Command which will be run by `npm run build` command.|
|start | Command which will be run by `npm run start` command.|

## Translation patch

### 1. Translated files

In the `patch` directory place all trnslated files. All files in the original site will be replaced by theese translated files according their name and relative path. All relative path must be same for original site directory and the `patch` directory. So `patch/subdir/index.html` will replace the file `subdir/index.html` in the original site directory.

### 2. Translated strings

When no need to translate whole file, but only some strings inside it you can use special `strings.json` file in the `patch` directory. It is a list of original and translated strings grouped by filenames.

The initial example looks like this:
```json
{
    "src/main.js": {

        "name: 'world'": 
        "name: 'Мир'"
        
    }
}
```
You can add file path there and any number of the new strings pairs into it. It is not support any regular expressions. Any occurance of the needed string will be replaced with translated one.
