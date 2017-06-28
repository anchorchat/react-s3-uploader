import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  signingUrl: PropTypes.string.isRequired,
  preprocess: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  signingUrlHeaders: PropTypes.instanceOf(Object),
  uploadUrlHeaders: PropTypes.instanceOf(Object)
};

const defaultProps = {
  signingUrlHeaders: {},
  uploadUrlHeaders: {}
};

class ReactS3Uploader extends Component {
  getSigningUrl = (file) => {
    const { onError, signingUrlHeaders, signingUrl } = this.props;

    const objectName = file.name || '';
    const contentType = file.type || '';

    const options = {
      params: {
        objectName,
        contentType
      },
      headers: signingUrlHeaders
    };
    axios.get(signingUrl, options)
    .then((res) => {
      const { ok } = (res && res.data) || {};

      if (!ok) {
        return onError(res);
      }

      return this.uploadFile(file, res.data);
    })
    .catch((err) => {
      onError(err);
    });
  }

  uploadFile = (file, signingResult) => {
    const { onFinish, onError, uploadUrlHeaders } = this.props;
    const { signedUrl } = signingResult;

    return axios.put(signedUrl, file, { headers: uploadUrlHeaders })
    .then(() => {
      onFinish(signingResult);
    })
    .catch((err) => {
      onError(err);
    });
  }

  handleUpload = () => {
    const { preprocess } = this.props;

    const file = this.input.files[0] || {};

    preprocess(file, this.getSigningUrl);
  }

  render() {
    const {
      signingUrl, // eslint-disable-line no-unused-vars
      preprocess, // eslint-disable-line no-unused-vars
      onFinish, // eslint-disable-line no-unused-vars
      onError, // eslint-disable-line no-unused-vars
      signingUrlHeaders, // eslint-disable-line no-unused-vars
      uploadUrlHeaders, // eslint-disable-line no-unused-vars
      ...custom
    } = this.props;

    return (
      <input
        type="file"
        onChange={this.handleUpload}
        ref={(node) => { this.input = node; }}
        {...custom}
      />
    );
  }
}

ReactS3Uploader.propTypes = propTypes;
ReactS3Uploader.defaultProps = defaultProps;

export default ReactS3Uploader;
