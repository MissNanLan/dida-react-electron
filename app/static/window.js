'use strict';
import { Button } from 'antd';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
   return （ <Button >打开窗口</Button>）
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );
  }
}


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);