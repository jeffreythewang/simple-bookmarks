import alt from '../alt';
import AddBookmarkActions from '../actions/AddBookmarkActions';

class AddBookmarkStore {
  constructor() {
    this.bindActions(AddBookmarkActions);
    this.name = '';
    this.url = '';
    this.nameValidationState = '';
    this.urlValidationState = '';
  }

  onAddBookmarkSuccess(success) {
    this.nameValidationState = 'has-success';
  }

  onAddBookmarkFail(error) {
    this.nameValidationState = 'has-error';
  }

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
  }

  onUpdateUrl(event) {
    this.url = event.target.value;
    this.urlValidationState = '';
  }

  onInvalidName() {
    this.nameValidationState = 'has-error';
  }

  onInvalidUrl() {
    this.urlValidationState = 'has-error';
  }
}

export default alt.createStore(AddBookmarkStore);
