import React, { Component } from 'react';

class JobEditor extends Component {
  render() {
    return (
      <form className="Job-editor">
        <input type="text" onChange={(e)=>this.props.handleChangeInput(e)} name="title" value={this.props.currTitle} />
        <textarea onChange={(e) => this.props.handleChangeTextArea(e)} name="body" value={this.props.currBody}/>
        <div className="button-row">
          <input className="button" onClick={()=>{this.props.saveJob(this.props.currJob)}}type="submit" value="Save" />
          <button type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default JobEditor;
