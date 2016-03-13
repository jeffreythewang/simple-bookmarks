import React from 'react';
import AddBookmarkStore from '../stores/AddBookmarkStore';
import AddBookmarkActions from '../actions/AddBookmarkActions';

class AddBookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddBookmarkStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddBookmarkStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddBookmarkStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name;
    var url = this.state.url;

    if (!name) {
      AddBookmarkActions.invalidName();
      this.refs.nameTextField.getDOMNode().focus();
    }

    if (!url) {
      AddBookmarkActions.invalidUrl();
    }

    if (name && url) {
      AddBookmarkActions.addBookmark(name, url);
    }
  }

  render () {
    return (
      <div>
        <div className="add-modal">
          <div className="modal-title">Add Bookmark</div>
          <div className="modal-body">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className={"form-group " + this.state.nameValidationState}>
                <label className="control-label">Name:</label>
                <input type="text" className="form-control" ref="nameTextField"
                  value={this.state.name}
                  onChange={AddBookmarkActions.updateName} autoFocus />
              </div>
              <div className={"form-group " + this.state.urlValidationState}>
                <label className="control-label">URL:</label>
                <input type="text" className="form-control" ref="urlTextField"
                  value={this.state.url}
                  onChange={AddBookmarkActions.updateUrl} />
              </div>
              <button type="submit" className="button button-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBookmark;
