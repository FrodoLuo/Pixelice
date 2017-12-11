import React from 'react';
import { connect } from 'dva';

import PhotoWall from '../../PhotoWall/photoWall';

class LikedPane extends React.Component {
  state = {
    photos: {
      state: 'ready',
      data: [],
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'photo/getLikedPhotos',
    });
  }
  componentWillReceiveProps(nextProps) {
    switch (nextProps.processing) {
      case 'likedPhotos':
        this.setState({
          photos: nextProps.photos,
        });
    }
  }
  render() {
    return (
      <PhotoWall photos={this.state.photos} />
    );
  }
}
export default connect((models) => {
  return models.photo;
})(LikedPane);
