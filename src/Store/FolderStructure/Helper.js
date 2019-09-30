const uuid = require('uuid');

export const createFile = ({ name }) => {
    return { name }
}

export const createFolder = ({ name }) => {
    return { name, children: {} }
}

export const addFolderToChild = ({ name, obj, path }) => {
    path.forEach(item => {
        if (typeof obj[item.id].children == "object") {
            console.log(obj);
            obj[item.id].children[uuid()] = createFolder({ name });
            return obj;
        }
        else {
            throw new Error("Cannot create a folder in a file");
        }
    })
    return obj;
}


export const addFileToChild = ({ name, obj, path }) => {
    if (path.length == 0) {
        obj.children[uuid()] = createFile({ name });
        return obj;
    }
    else {
        path.forEach(item => {
            if (typeof obj.children[item.id].children == "object") {
                console.log(obj);
                obj.children[item.id].children[uuid()] = createFile({ name });
                return obj;
            }
            else {
                throw new Error("Cannot create a folder in a file");
            }
        })
        return obj;
    }
}






