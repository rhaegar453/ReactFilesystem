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
  getItem = ({ obj, path }) => {
    if (path.length == 0) {
      return obj.children;
    }
    else {
      path.forEach(item => {
        if (obj.children[item.id].children) {
          console.log("This is without the children")
          console.log(JSON.stringify(obj));
          if (typeof obj.children[item.id].children == "object") {
            obj = obj.children[item.id]
          }
          else {
            return;
          }
        }
        else {
          throw new Error("Trying to navigate into a file. Not possible");
        }
      })
      return obj;
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
  updateTracker = (id, folderName) => {
    let newObj = { id, folderName };
    this.props.updateTracker(newObj);
  }
  render() {
    let children = this.getItem(({ obj: this.props.root, path: this.props.tracker }))
    return (
      <div>
        <div className="centeredCss" style={{ marginTop: "20px" }}>
          <div className="col-md-6" >
            <div className="row">
              {this.props.tracker.map(item => (
                <p>{item.name} ></p>
              ))}
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
          {Object.keys(children).length > 0 ? <div>

            {Object.keys(children).map((item, index) => (
              <div key={index}>
                {children[item].children ? <p onClick={() => this.updateTracker(item, children[item].name)}>{children[item].name} ></p> : <p>{children[item].name}</p>}
              </div>
            ))}
          </div> : null}
        </div>
        <div>
          <u>State</u>
          {JSON.stringify(this.props.root)}
        </div>
        <div>
          <u>tracker</u>
          {JSON.stringify(this.props.tracker)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    root: state.fs.root,
    tracker: state.fs.tracker,
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFile: ({ name }) => dispatch(addFile({ name })),
    addFolder: ({ name }) => dispatch(addFolder({ name })),
    updateTracker: ({ id, folderName }) => dispatch(updateTracker({ id, folderName }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);