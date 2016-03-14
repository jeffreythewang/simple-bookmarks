import React from 'react';
import Sidebar from './sidebar';
import AddBookmark from './add_bookmark';

class App extends React.Component {
 render() {
    return (
      <div>
        {this.props.children}
        <AddBookmark />
        <Sidebar />
      </div>
    );
  }
}

export default App;
