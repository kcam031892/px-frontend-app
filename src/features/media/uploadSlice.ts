import { Satellite } from '@material-ui/icons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJobStatus, uploadFile } from '../../api/myProfile';
import { AppThunk } from '../../app/store';
import { MediaType, ResultType } from '../../types';
import { queryMedia, queryPhotos } from './mediaSlice';
import { FileUploadModel, FileUploadState, MediaConvertJobDetailModel, UploadStatus } from './uploadTypes';

const initialState: FileUploadState = {
  model: [],
};

interface UpdateProgressAction {
  fileId: string;
  progress: number;
}

interface UpdateMediaProgressAction {
  fileId: string;
  mediaJobDetail: MediaConvertJobDetailModel;
}

interface UpdateUploadAction {
  fileId: string;
  mediaType: MediaType;
  mediaJobDetail: MediaConvertJobDetailModel;
  fileUrl: string;
}

const fileUploadSlice = createSlice({
  name: 'primaryImage',
  initialState,
  reducers: {
    uploadNewFiles(state: FileUploadState, action: PayloadAction<FileUploadModel>) {
      state.model.push(action.payload);
    },

    completeUpload(state: FileUploadState, action: PayloadAction<FileUploadModel>) {
      state.model = state.model.filter((x) => x.id !== action.payload.id);
    },

    updateProgress(state: FileUploadState, action: PayloadAction<UpdateProgressAction>) {
      const file = state.model.find((x) => x.id === action.payload.fileId);
      if (file) {
        file.progress = action.payload.progress;
      }
    },

    updateMediaProgress(state: FileUploadState, action: PayloadAction<UpdateMediaProgressAction>) {
      const file = state.model.find((x) => x.id === action.payload.fileId);
      if (file) {
        file.mediaJobDetail = action.payload.mediaJobDetail;
        if (action.payload.mediaJobDetail.status === 2) {
          file.status = UploadStatus.Completed;
          file.progress = 100;
        } else if (action.payload.mediaJobDetail.encodingState === 'waiting') {
          file.progress = 60;
        } else if (action.payload.mediaJobDetail.encodingState === 'Processing') {
          file.progress = Math.round(60 + action.payload.mediaJobDetail.encodingProgress * 0.5);
        }
      }
    },

    updateUploadStatus(state: FileUploadState, action: PayloadAction<UpdateUploadAction>) {
      const file = state.model.find((x) => x.id === action.payload.fileId);
      if (file) {
        if (action.payload.mediaType !== MediaType.IMAGE) {
          file.mediaType = action.payload.mediaType;
          file.status = UploadStatus.Encoding;
          file.fileUrl = action.payload.fileUrl;
        } else {
          file.status = UploadStatus.Completed;
          file.progress = 100;
        }
      }
    },

    removeUploadItem(state: FileUploadState, action: PayloadAction<FileUploadModel>) {
      state.model = state.model.filter((x) => x.id !== action.payload.id);
    },

    clearUploadItems(state: FileUploadState) {
      state.model = state.model.filter((x) => x.status !== UploadStatus.Completed);
    },
  },
});

export const {
  uploadNewFiles,
  completeUpload,
  updateProgress,
  updateMediaProgress,
  updateUploadStatus,
  removeUploadItem,
  clearUploadItems,
} = fileUploadSlice.actions;

export default fileUploadSlice.reducer;

export const postUploadFile =
  (memberId: string, formData: FormData, file: FileUploadModel): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(uploadNewFiles(file));
      const result = await uploadFile(memberId, formData, (event: any) => {
        const progress = Math.round((50 * event.loaded) / event.total);
        dispatch(updateProgress({ fileId: file.id, progress: progress }));
      });
      //update status
      if (result.data.mediaJob && result.data.finalFileUrl) {
        dispatch(
          updateUploadStatus({
            fileId: file.id,
            mediaType: result.data.mediaType,
            mediaJobDetail: result.data.mediaJob,
            fileUrl: result.data.finalFileUrl,
          }),
        );
      }

      if (result.type === ResultType.success) {
        if (result.data.mediaType === MediaType.IMAGE) {
          dispatch(queryPhotos(memberId));
        } else if (result.data.mediaType === MediaType.VIDEO || result.data.mediaType === MediaType.AUDIO) {
          const queryJobStatus = async () => {
            if (result.data.mediaJob) {
              const jobStatusResult = await fetchJobStatus(result.data.mediaJob);
              dispatch(updateMediaProgress({ fileId: file.id, mediaJobDetail: jobStatusResult.data }));
              if (jobStatusResult.type === ResultType.success) {
                if (jobStatusResult.data.status === 2) {
                  dispatch(queryMedia(memberId, jobStatusResult.data.mediaType));
                } else {
                  setTimeout(() => {
                    queryJobStatus();
                  }, 1000);
                }
              }
            }
          };
          setTimeout(() => {
            queryJobStatus();
          }, 1000);
        }
      }
    } catch (err) {}
  };
