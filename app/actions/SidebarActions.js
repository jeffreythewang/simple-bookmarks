import alt from '../alt';

class SidebarActions {
  constructor() {
    this.generateActions(
      'getBookmarksSuccess',
      'getBookmarksFail'
      );
  }

  getBookmarks(folder) {
    $.ajax({
      type: 'GET',
      url: '/api/bookmarks',
      data: { folder: folder }
    })
      .done((data) => {
        this.actions.getBookmarksSuccess(data)
      })
      .fail((e) => {
        this.actions.getBookmarksFail(e)
      });
  }
}

export default alt.createActions(SidebarActions);
