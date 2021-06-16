const aws = require("aws-sdk");
const fs = require("fs");

let secrets =
    process.env.NODE_ENV === "production"
        ? process.env
        : require("./secrets.json");

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.uploadFile = (fileToUpload) => {
    const { filename, mimetype, size, path } = fileToUpload;

    return s3
        .putObject({
            Bucket: "melange-imageboard-friederike",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();
};

exports.getS3URL = (filename) =>
    "https://melange-imageboard-friederike.s3.eu-west-2.amazonaws.com/" +
    filename;
