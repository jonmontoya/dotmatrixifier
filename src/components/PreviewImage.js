import React from 'react';

class PreviewImage extends React.Component {
  componentDidUpdate() {
    const { previewData } = this.props;
    const { previewImage } = this;
    if (!previewData) return;
    previewImage.width = previewData.width;
    previewImage.height = previewData.height;

    const context = previewImage.getContext('2d');
    context.putImageData(previewData, 0, 0);
  }

  render() {
    return (
      <canvas
        ref={previewImage => this.previewImage = previewImage}
        className="jmt_dotmatrixifier_preview_image"
      />
    );
  }
}

export default PreviewImage;
