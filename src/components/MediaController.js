import React, { Component } from 'react'
import { withMediaProps } from 'react-media-player'

class MediaController extends Component {
  shouldComponentUpdate({ media }) {
    if (!media.isPlaying) {
      this.props.updateUrl();
    }
  }

  render() {
    return (
      <div />
    )
  }
}

export default withMediaProps(MediaController)
