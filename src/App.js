import React from 'react';
import { connect } from 'react-redux';
import AddChild from './Components/AddChild';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="col-md-3" style={{ marginTop: "10px" }}>
          <AddChild folder={true} />
          <div style={{ marginTop: '20px' }}>
            <AddChild />

          </div>
        </div>
        {/* {console.log(this.props.root)} */}
        {Object.keys(this.props.root.children).map(item => (
          // <p>{this.props.root.children[item].name}</p>
          <div>
            {this.props.root.children[item].children ? <p>{this.props.root.children[item].name} ></p> : <p>{this.props.root.children[item].name}</p>}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    root: state.fs.root
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);