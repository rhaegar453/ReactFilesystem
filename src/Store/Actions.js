import * as actions from './ActionTypes';

export const addFile=({name})=>{
    return {
        type:actions.addFile,
        payload:{name}
    }
}

export const removeFile=({id})=>{
    return {
        type:actions.removeFile,
        payload:{id}
    }
}

export const addFolder=({name})=>{
    return {
        type:actions.addFolder,
        payload:{name}
    }
}

export const removeFolder=({id})=>{
    return {
        type:actions.removeFolder,
        payload:{id}
    }
}



export const updateTracker=({id, folderName})=>{
    console.log("Inside the tracker updater")
    console.log(id, folderName);
    return {
        type:actions.updateTracker,
        payload:{id, folderName}
    }
}

