import React from 'react';
import {connect} from 'react-redux';
import './global.css';
import {addFile,addFolder} from '../Store/Actions';

class AddChild extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
    }
    onChangeName=(e)=>{
        this.setState({name:e.target.value});
    }
    submitForm=()=>{
        if(this.props.folder){
            this.props.addFolder({name:this.state.name});
        }
        else{
            this.props.addFile({name:this.state.name});
        }
    }

    render(){
        return(
            <div>
                {this.props.folder?<input className="form-control" placeholder="Folder Name" value={this.state.name} onChange={this.onChangeName}></input>:<input className="form-control" onChange={this.onChangeName} placeholder="File Name" value={this.state.name}></input>}
                <div className="centeredCss" style={{marginTop:"10px"}}>
                {this.props.folder?<button className="btn btn-primary" onClick={this.submitForm}>Add Folder</button>:<button className="btn btn-primary" onClick={this.submitForm}>Add File</button>}
                </div>
            </div>
        )
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        addFile:({name})=>dispatch(addFile({name})),
        addFolder:({name})=>dispatch(addFolder({name}))
    }
}

export default connect(null, mapDispatchToProps)(AddChild);