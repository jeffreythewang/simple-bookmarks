import React from 'react';
import {Link} from 'react-router';
import Draggable, {DraggableCore} from 'react-draggable';
import SidebarStore from '../stores/SidebarStore';
import SidebarActions from '../actions/SidebarActions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = SidebarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SidebarStore.listen(this.onChange);
    SidebarActions.getBookmarks('root');
  }

  componentWillUnmount() {
    SidebarStore.unlisten(this.onChange);
  }

  refresh() {
    SidebarActions.getBookmarks('root');
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var drags = {onStart: this.onStart, onStop: this.onStop};

    var bookmarks = this.state.bookmarks.map(bookmark => {
      var ensureAbsolute = (url) => {
         if (!/^(f|ht)tps?:\/\//i.test(url)) {
            url = "http://" + url;
         }
         return url;
      };

      return (
        <Draggable
          handle="strong"
          {...this.onChange}
        >
          <div className="box no-cursor">
            <strong className="cursor">Move</strong>
            <div className="some-name"><a href={ensureAbsolute(bookmark.url)}>{bookmark.name}</a></div>
          </div>
        </Draggable>
      );
    });

    return (
      <div>
        <div className="sidebar">
          <div className="folders">
            <div className="button-div"><button onClick={this.refresh} className="button button-primary">Refresh</button></div>
            {bookmarks}
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
