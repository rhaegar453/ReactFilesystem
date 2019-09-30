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



export const updateTracker=({name})=>{
    console.log("Inside the tracker updater action")
    console.log(name);
    return {
        type:actions.updateTracker,
        payload:name
    }
}

