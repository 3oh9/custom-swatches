import { withRouter } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import '@babel/polyfill';
import { shape, string, arrayOf, func } from 'prop-types';
import './style.scss';
import axios from 'axios';

class ImageCropComponent extends Component {
  static propTypes = {
    data: shape({
      name: string,
      images: arrayOf(shape()),
    }).isRequired,
    productImages: arrayOf(shape()),
    updateImageCrop: func.isRequired,
    imageCrop: shape().isRequired,
  }

  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      src: this.onSelectFromVariant(this.props.data.productImages[0].src),
      crop: {
        unit: 'px',
        width: 50,
        height: 50,
        aspect: 1 / 1,
      },
      active: 0,
    };
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onSelectFromVariant = (src) => {
    axios({
      method: 'GET',
      url: src,
      responseType: 'blob',
    }).then((response) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({ src: reader.result });
      });
      reader.readAsDataURL(response.data);
    });
  }

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.crossOrigin = 'anonymous';
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });

      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.props.updateImageCrop(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', croppedImageUrl);
      xhr.responseType = 'blob';
      xhr.send();
    }
  }

  handleImageClick = (e) => {
    e.preventDefault();
    this.setState({
      active: +e.currentTarget.dataset.index,
    });
    this.onSelectFromVariant(e.currentTarget.src);
  }

  render() {
    const {
      crop, croppedImageUrl, src, fileValue, active
    } = this.state;
    const { handleImageClick } = this;
    const { data, productImages } = this.props;
    const firstImage = null;

    const imageMarkup = (image, index) => (
      <img
        src={image.src}
        onClick={handleImageClick}
        alt={`Variant ${image.id}`}
        onKeyPress={handleImageClick}
        role="presentation"
        key={index}
        data-index={index}
        className={`gallery__image ${active === index && 'gallery__image--active'}`}
        crossOrigin="anonymous"
      />
    );

    const productImagesGallery = (
      productImages.length ? (
        <Fragment>
          <h3 className="gallery__title">Choose image:</h3>
          <div className="gallery">
            {productImages.map((image, index) => imageMarkup(image, index))}
          </div>
        </Fragment>
      ) : (<h3 className="gallery__title">There are no images</h3>)
    );

    return (
      <Fragment>
        { productImagesGallery }

        {src && (
          <Fragment>
            <h3 className="gallery__title">Crop swatch:</h3>
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              minWidth={50}
              minHeight={50}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withRouter(ImageCropComponent);
