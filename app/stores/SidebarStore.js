import alt from '../alt';
import SidebarActions from '../actions/SidebarActions';

class SidebarStore {
  constructor() {
    this.bindActions(SidebarActions);
    this.bookmarks = [];
  }

  onGetBookmarksSuccess(data) {
    this.bookmarks = data;
  }

  onGetBookmarksFail(e) {
    toastr.error(e.responseJSON && e.responseJSON.message || e.responseText || e.statusText);
  }
}

export default alt.createStore(SidebarStore);
