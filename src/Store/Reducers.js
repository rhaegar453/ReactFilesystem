import * as actions from './ActionTypes';
import Folder from './FolderStructure/Folder';
import { createFile, createFolder, addFolderToChild, addFileToChild } from './FolderStructure/Helper';

const Root = new Folder({ name: "Root", root: true });

const initialStore = {
    root: createFolder({ name: 'Root' }),
    tracker: []
}


const reducer = (state = initialStore, action) => {
    switch (action.type) {
        case actions.addFile:
            let curr = { ...state.root };
            console.log(curr);
            curr = addFileToChild({name:action.payload.name, obj:curr, path:state.tracker})
            return { ...state, root:curr };
        case actions.addFolder:
            let curr1 = { ...state.root }
            curr1 = addFolderToChild({ name: action.payload.name, obj: curr1, path: state.tracker })
            return { ...state, root:curr1 };
        default:
            return state;
    }
}

export default reducer;