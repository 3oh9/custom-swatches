import {
  UPDATE_IMAGE_CROP_STARTED,
  UPDATE_IMAGE_CROP_FINISHED,
} from '../actions/types';

const initialState = {
  imageCropBase64String: '',
  updatingImageCrop: false,
  updatedImageCrop: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_IMAGE_CROP_STARTED:
      return {
        ...state,
        updatingImageCrop: true,
        updatedImageCrop: false,
      };
    case UPDATE_IMAGE_CROP_FINISHED:
      return {
        ...state,
        updatingImageCrop: false,
        updatedImageCrop: true,
        imageCropBase64String: action.payload,
      };
    default: return state;
  }
};
