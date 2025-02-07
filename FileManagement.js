class File {
  constructor(name, content = "") {
    this.name = name;
    this.content = content;
  }
}

class Folder {
  constructor(name) {
    this.name = name;
    this.files = new Map();
    this.folders = new Map();
  }

  addFile(name, content) {
    if (this.files.has(name)) {
      console.log(`File "${name}" already exists.`);
      return;
    }
    this.files.set(name, new File(name, content));
  }

  removeFile(name) {
    if (!this.files.has(name)) {
      console.log(`File "${name}" not found.`);
      return;
    }
    this.files.delete(name);
  }

  addFolder(name) {
    if (this.folders.has(name)) {
      console.log(`Folder "${name}" already exists.`);
      return;
    }
    this.folders.set(name, new Folder(name));
  }

  removeFolder(name) {
    if (!this.folders.has(name)) {
      console.log(`Folder "${name}" not found.`);
      return;
    }
    this.folders.delete(name);
  }

  getFolder(name) {
    return this.folders.get(name) || null;
  }

  getFile(name) {
    return this.files.get(name) || null;
  }

  searchFile(name, path = "") {
    for (let file of this.files.values()) {
      if (file.name === name) {
        return `${path}/${file.name}`;
      }
    }
    for (let [folderName, folder] of this.folders.entries()) {
      let found = folder.searchFile(name, `${path}/${folderName}`);
      if (found) return found;
    }
    return null;
  }

  searchFolder(name, path = "") {
    if (this.name === name) {
      return `${path}/${this.name}`;
    }
    for (let [folderName, folder] of this.folders.entries()) {
      let found = folder.searchFolder(name, `${path}/${folderName}`);
      if (found) return found;
    }
    return null;
  }

  display(indent = 0) {
    console.log(" ".repeat(indent) + `📂 ${this.name}`);
    for (let file of this.files.keys()) {
      console.log(" ".repeat(indent + 2) + `📄 ${file}`);
    }
    for (let folder of this.folders.values()) {
      folder.display(indent + 2);
    }
  }
}

// CLI Interaction
const root = new Folder("root");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const commands = `
  Commands:
    add-folder <path> <name>
    add-file <path> <name> <content>
    remove-folder <path> <name>
    remove-file <path> <name>
    search-file <name>
    search-folder <name>
    display
    exit
  `;

function getFolderFromPath(path) {
  if (!path) return null;
  let parts = path.split("/").filter(Boolean);
  let current = root;
  for (let part of parts) {
    if (!current.folders.has(part)) {
      console.log(`Folder "${part}" not found.`);
      return null;
    }
    current = current.folders.get(part);
  }
  return current;
}

function processCommand(command) {
  let args = command.trim().split(" ");
  if (args.length === 0 || !args[0]) {
    console.log("Invalid command. Please enter a valid command.");
    return;
  }
  switch (args[0]) {
    case "add-folder":
      if (args.length < 3) {
        console.log("Usage: add-folder <path> <name>");
        return;
      }
      let folderParent = getFolderFromPath(args[1]);
      if (folderParent) folderParent.addFolder(args[2]);
      break;
    case "add-file":
      if (args.length < 4) {
        console.log("Usage: add-file <path> <name> <content>");
        return;
      }
      let fileParent = getFolderFromPath(args[1]);
      if (fileParent) fileParent.addFile(args[2], args.slice(3).join(" "));
      break;
    case "remove-folder":
      if (args.length < 3) {
        console.log("Usage: remove-folder <path> <name>");
        return;
      }
      let removeFolderParent = getFolderFromPath(args[1]);
      if (removeFolderParent) removeFolderParent.removeFolder(args[2]);
      break;
    case "remove-file":
      if (args.length < 3) {
        console.log("Usage: remove-file <path> <name>");
        return;
      }
      let removeFileParent = getFolderFromPath(args[1]);
      if (removeFileParent) removeFileParent.removeFile(args[2]);
      break;
    case "search-file":
      if (args.length < 2) {
        console.log("Usage: search-file <name>");
        return;
      }
      console.log(root.searchFile(args[1]) || "File not found.");
      break;
    case "search-folder":
      if (args.length < 2) {
        console.log("Usage: search-folder <name>");
        return;
      }
      console.log(root.searchFolder(args[1]) || "Folder not found.");
      break;
    case "display":
      root.display();
      break;
    case "exit":
      rl.close();
      return;
    default:
      console.log("Invalid command.");
  }
}

console.log("Folder Tree CLI Application");
console.log(commands);
rl.on("line", processCommand);