import * as actions from './ActionTypes';
import Folder from './FolderStructure/Folder';
import uuid from 'uuid';

const initialStore = {
    folders:[],
    files:[],
    tracker:['/'],
}


const reducer = (state = initialStore, action) => {
    switch (action.type) {
        case actions.addFile:
            return { ...state, files: [...state.files, [state.tracker.join(''), action.payload.name]] };
        case actions.addFolder:
            return {...state, folders:[...state.folders, [state.tracker.join(''), action.payload.name]]};
        case actions.updateTracker:
            let x=[...state.tracker, action.payload]
            console.log(x);
            return {...state, tracker:x}
        default:
            return state;
    }
}

export default reducer;