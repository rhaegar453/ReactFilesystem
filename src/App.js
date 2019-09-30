import React from 'react';
import { connect } from 'react-redux';
import "./Components/global.css"
import AddChild from './Components/AddChild';
import { addFile, addFolder, updateTracker, updateToolTip, removeFile, removeFolder } from './Store/Actions';
import './Components/global.css'

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
    this.props.updateTracker({ name });
  }
  render() {
    console.log(this.props.tracker)
    return (
      <div>
        <div className="centeredCss" style={{ marginTop: "20px" }}>
          <div className="col-md-6" >
            <div className="spaceAroundCss" style={{ width: "100%" }}>
              <button className="btn btn-sm btn-primary" onClick={this.promptFileBox}>Add File</button>
              <button className="btn btn-sm btn-primary" onClick={this.promptFolderBox}>Add Folder</button>
            </div>
          </div>
        </div>
        <div style={{ marginLeft: "40px" }}>
          <div className="row">
            {this.props.tracker.map((item, index) => (
              <div>
                {index == 0 ? <span onClick={() => this.props.updateToolTip({ index })} class="badge badge-success">root/</span> : <span onClick={() => this.props.updateToolTip({ index })} class="badge badge-success">{item}</span>}
              </div>
            ))}
          </div>
          <div className="col-md-8">
            <ul className="list-group">
              {this.props.folders.map(item => (
                <div>
                  {item.path == this.props.tracker.join('') ? <div className="row">
                    <div style={{width:'80%'}}><li className="list-group-item list-group-item-action" onClick={() => this.updateTracker(item.name + '/')}><div className="row spaceBetweenCss"><div>{item.name}/</div></div></li></div><div style={{marginTop:"5px"}}><button onClick={()=>this.props.removeFolder({id:item.id})} className="btn btn-danger"><i class="far fa-trash-alt"></i></button></div>
                  </div> : null}
                </div>
              ))}
            </ul>
            <ul className="list-group">
              {this.props.files.map(item => (
                <div>
                  {item.path == this.props.tracker.join('') ? <div className="row">
                    <div style={{width:'80%'}}><li style={{ backgroundColor: '#d5d5de' }} className="list-group-item" ><div className="row spaceBetweenCss"><div>{item.name}</div></div></li></div><div style={{marginTop:"5px"}}><button onClick={()=>this.props.removeFile({id:item.id})} className="btn btn-danger"><i class="far fa-trash-alt"></i></button></div>
                  </div> : null}
                </div>
              ))}
            </ul>
          </div>
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
    updateTracker: ({ name }) => dispatch(updateTracker({ name })),
    updateToolTip: ({ index }) => dispatch(updateToolTip({ index })),
    removeFile:({id})=>dispatch(removeFile({id})),
    removeFolder:({id})=>dispatch(removeFolder({id}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);