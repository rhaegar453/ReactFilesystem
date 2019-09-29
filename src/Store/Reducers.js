import * as actions from './ActionTypes';
import Folder from './FolderStructure/Folder';

const Root=new Folder({name:"Root", root:true});

const initialStore={
    root:Root,
    tracker:[]
}


const reducer=(state=initialStore, action)=>{
    switch(action.type){
        case actions.addFile:
            let curr={...state.root};
            curr.addFolderToChild({name:action.payload.name, pathArr:state.tracker});
            return {...state, curr};
        case actions.addFolder:
            curr={...state.root};
            curr.addFileToChild({name:action.payload.name, pathArr:state.tracker});
            return {...state, curr};
        
        default:
            return state;
    }
}

export default reducer;