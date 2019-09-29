FileUploadController = function() {};
var fs = require("fs");

FileUploadController.prototype.uploadFile = function(req, res) {
  /**
   * The following takes the blob uploaded to an arbitrary location with
   * a random file name and copies it to the specified file.path with the file.name.
   * Note that the file.name should come from your upload request on the client side
   * because when the file is selected it is paired with its name. The file.name is
   * not random nor is the file.path.
   */
  
}

module.exports = new FileUploadController();