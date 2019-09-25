import {
  UPDATE_IMAGE_CROP_STARTED,
  UPDATE_IMAGE_CROP_FINISHED,
} from './types';

export const updateImageCropStarted = payload => (dispatch) => {
  dispatch({ type: UPDATE_IMAGE_CROP_STARTED, payload });
};

export const updateImageCropFinished = payload => (dispatch) => {
  dispatch({ type: UPDATE_IMAGE_CROP_FINISHED, payload });
};

export const updateImageCrop = imageBase64String => (dispatch) => {
  dispatch(updateImageCropStarted);
  // additional actions;
  dispatch(updateImageCropFinished(imageBase64String));
};
