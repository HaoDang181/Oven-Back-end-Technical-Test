# File Management Application

## Overview
This is a simple command-line interface (CLI) application that allows users to manage a folder tree structure. It follows object-oriented programming principles and is implemented using Node.js.

## Features
- Create folders and files.
- Remove folders and files.
- Search for a file by name.
- Search for a folder by name.
- Display the folder structure in a tree format.

## Prerequisites
Ensure you have Node.js installed. You can verify the installation by running:

```sh
node -v
```

If Node.js is not installed, download it from [Node.js official website](https://nodejs.org/).

## Installation
1. Clone the repository or download the script.
2. Navigate to the project directory.

## Usage
Run the application in the terminal using:

```sh
node folderTree.js
```

### Available Commands
```
Commands:
  add-folder <path> <name>       Add a new folder at the specified path.
  add-file <path> <name> <content>  Add a new file with content at the specified path.
  remove-folder <path> <name>    Remove a folder from the specified path.
  remove-file <path> <name>      Remove a file from the specified path.
  search-file <name>             Search for a file by name.
  search-folder <name>           Search for a folder by name.
  display                        Display the folder tree structure.
  exit                           Exit the application.
```

### Example Usage
- **Add a folder:**
  ```sh
  add-folder / root-folder
  ```

- **Add a file inside a folder:**
  ```sh
  add-file /root-folder myFile.txt "Hello, world!"
  ```

- **Remove a file:**
  ```sh
  remove-file /root-folder myFile.txt
  ```

- **Search for a file:**
  ```sh
  search-file myFile.txt
  ```

- **Display the folder structure:**
  ```sh
  display
  ```

- **Exit the CLI:**
  ```sh
  exit
  ```

## Handling Errors
- If an incorrect command or missing parameters are provided, the application will prompt with the correct usage.
- If an attempt is made to add a file or folder in a non-existent path, an error message will be displayed.

## License
This project is open-source and free to use.

