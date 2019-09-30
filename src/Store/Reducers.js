import * as actions from './ActionTypes';
import uuid from 'uuid';

const initialStore = {
    folders:[],
    files:[],
    tracker:['/'],
    id:0
}


const reducer = (state = initialStore, action) => {
    switch (action.type) {
        case actions.addFile:
            let newFile={name:action.payload.name, path:state.tracker.join(''), id:state.id++};
            return { ...state, files: [...state.files, newFile], id:state.id++};
        case actions.addFolder:
            let newFolder={name:action.payload.name, path:state.tracker.join(''), id:state.id++}
            return {...state, folders:[...state.folders, newFolder], id:state.id++};
        case actions.updateTracker:
            let x=[...state.tracker, action.payload]
            console.log(x);
            return {...state, tracker:x}
        case actions.updateToolTip:
            let splicedArr=state.tracker.filter((item, index)=>index<=action.payload);
            console.log(action.payload);
            return {...state, tracker:splicedArr}
        default:
            return state;
    }
}

export default reducer;