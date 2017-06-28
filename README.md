# react-s3-uploader

A React component that uploads files to a S3 Bucket.

## Usage

Install from npm

```bash
$ npm i -S @anchorchat/react-s3-uploader
```

The `ReactS3Uploader` component accepts the following props:

| Name              | Type     | Description                                         | Required | Default                    |
| ----------------- | -------- | --------------------------------------------------- | -------- | -------------------------- |
| signingUrl        | String   | Get signed url used for uploading to s3             | Yes      |                            |
| signingUrlHeaders | Object   | Optional headers for the signingUrl request         | No       | { }                        |
| uploadUrlHeaders  | Object   | Optional headers for the upload request             | No       | { }                        |
| preprocess        | Function | Do something before uploading                       | No       | (file, next) => next(file) |
| onFinish          | Function | Callback fired when the uploading is finished       | Yes      |                            |
| onError           | Function | Callback fired when an error occurs while uploading | Yes      |                            |

## License

This project is licensed under the terms of the [MIT license](https://github.com/anchorchat/react-s3-uploader/blob/master/LICENSE).
