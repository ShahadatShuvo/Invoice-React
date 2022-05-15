import React from "react";
import ImageUploading from "react-images-uploading";
import CancelIcon from "@mui/icons-material/Cancel";
function ImageUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  return (
    <div>
      <div className="App">
        <ImageUploading
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              {images.length < 1 ? (
                <button className="img" onClick={onImageUpload} {...dragProps}>
                  Your Logo
                </button>
              ) : (
                ""
              )}
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <div className="content_img">
                    <img
                      className="imgAfterUpload"
                      src={image.data_url}
                      alt=""
                      width="100"
                    />
                    <div
                      className="update"
                      onClick={() => onImageUpdate(index)}
                    >
                      <p>Change Image</p>
                    </div>
                    <div className="delete">
                      <CancelIcon
                        onClick={() => onImageRemove(index)}
                        color="error"
                      />
                    </div>
                  </div>
                  <div className="image-item__btn-wrapper"></div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}

export default ImageUpload;
