import alt from '../alt';

class AddBookmarkActions {
  constructor() {
    this.generateActions(
      'addBookmarkSuccess',
      'addBookmarkFail',
      'updateName',
      'updateUrl',
      'invalidName',
      'invalidUrl'
    );
  }

  addBookmark(name, url) {
    $.ajax({
      type: 'POST',
      url: '/api/bookmarks',
      data: { name: name, url: url, folder: 'root' }
    })
      .done((data) => {
        this.actions.addBookmarkSuccess(data.message);
      })
      .fail((e) => {
        this.actions.addBookmarkFail(e.responseJSON.message);
      });
  }
}

export default alt.createActions(AddBookmarkActions);
