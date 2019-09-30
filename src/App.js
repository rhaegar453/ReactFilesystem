import React from 'react';
import { connect } from 'react-redux';
import "./Components/global.css"
import AddChild from './Components/AddChild';
import { addFile, addFolder, updateTracker } from './Store/Actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAddFolder: false,
      toggleAddFile: false
    }
  }

  promptFileBox = () => {
    let value = window.prompt("Please provide the file name");
    if (value != "" || value !== undefined) {
      this.props.addFile({ name: value });
    }
  }
  promptFolderBox = () => {
    let value = window.prompt("Please provide the Folder name");
    if (value != "" || value !== undefined) {
      this.props.addFolder({ name: value });
    }
  }
  updateTracker = (name) => {
    console.log("Inside the tracker");
    console.log(name);
    this.props.updateTracker({name});
  }
  render() {
    console.log(this.props.tracker)
    return (
      <div>
        <div className="centeredCss" style={{ marginTop: "20px" }}>
          <div className="col-md-6" >
            <div className="row">
            </div>
            <div className="spaceAroundCss" style={{ width: "100%" }}>
              <button className="btn btn-sm btn-primary" onClick={this.promptFileBox}>Add File</button>
              <button className="btn btn-sm btn-primary" onClick={this.promptFolderBox}>Add Folder</button>
            </div>
            {this.state.toggleAddFile ? <AddChild /> : null}
            {this.state.toggleAddFolder ? <AddChild folder={true} /> : null}
          </div>
        </div>
        <div>
          <p>{this.props.tracker}</p>
          {this.props.folders.map(item=>(
            <div>
              {item.includes(this.props.tracker.join(''))?<p onClick={()=>this.updateTracker(item[1]+'/')}>{item[1]}/</p>:null}
            </div>
          ))}
          {this.props.files.map(item=>(
            <div>
              {item.includes(this.props.tracker.join(''))?<p>{item[1]}</p>:null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    files: state.fs.files,
    folders: state.fs.folders,
    tracker: state.fs.tracker,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFile: ({ name }) => dispatch(addFile({ name })),
    addFolder: ({ name }) => dispatch(addFolder({ name })),
    updateTracker: ({name}) => dispatch(updateTracker({ name }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);