const File = require('./File');

class Folder {
    constructor({ name, root }) {
        this.id = 0;
        this.size = 0;
        this.name = name;
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        this.children = {};
        if (root) {
            this.isRoot = true;
        }
        else {
            this.isRoot = false;
        }
    }
    addFile({ name }) {
        let file = new File({ name })
        this.children[++this.id] = file;
        this.dateUpdated = new Date();
        this.size++;
    }
    removeFile({ id }) {
        if (typeof this.children[id].children != "object") {
            delete this.children[id];
            this.size--;
            this.dateUpdated = new Date();
        }
        else {
            throw new Error("Cannot delete a folder here");
        }
    }
    addFolder({ name }) {
        let newFolder = new Folder({ name });
        this.children[++this.id] = newFolder;
        this.dateUpdated = new Date();
        this.size++;
    }

    removeFolder({ id }) {
        if (typeof this.children[id].children == "object") {
            delete this.children[id];
            this.dateUpdated = new Date();
            this.size--;
        }
        else {
            throw new Error("Cannot deelte file here");
        }
    }

    getFolder({ key }) {
        if (this.isRoot) {
            let x = { ...this.children };
            key.forEach(item => {
                if (x.hasOwnProperty(item)) {
                    x = x[item].children;
                }
                else {
                    x = undefined;
                }
            });
            return x;
        }
        else {
            throw new Error("Method available only on the root.");
        }
    }

    addFolderToChild({ name, pathArr }) {
        if (this.isRoot) {
            let x = this.children;
            if (pathArr.length == 0) {
                this.addFolder({ name });
                return;
            }
            pathArr.forEach(item => {
                if (x.hasOwnProperty(item)) {
                    if (typeof x[item].children == "object") {
                        x = x[item].addFolder({ name });
                        return;
                    }
                    else{
                        throw new Error("Cannot create a folder in a file");
                    }
                }
                else {
                    throw new Error("Path not present");
                }
            });
            // x.addFolder({name});
            console.log(x);
        }
    }
    addFileToChild({ name, pathArr }) {
        if (this.isRoot) {
            let x = this.children;
            pathArr.forEach(item => {
                if (x.hasOwnProperty(item)) {
                    x = x[item].children;
                }
                else {
                    throw new Error("Path not present");
                }
            });
            x.addFile({ name });
        }
    }

}

// module.exports = Folder;

export default Folder;