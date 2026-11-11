import { get } from "lodash-es";
import {
  getMappingProfiles,
  getProfileData,
  onProfileCreate,
  saveProfileFromYaml,
  tempMappingOnProfileCreate,
  getOutputProfileData,
  getPassthroughProfileData,
  saveOnTargetProfileCreate,
} from "@/services/mapper";
import { saveOnSourceProfileCreate } from "./../../../services/mapper/index";

export const MANAGE_MAPPER_SET_FLOW = "managemapper/SET_FLOW";
export const MANAGE_MAPPER_SET_SELECTED_MENU = "managemapper/SET_SELECTED_MENU";
export const MANAGE_MAPPER_SET_LOADER = "managemapper/SET_LOADER";
export const MANAGE_MAPPER_SET_FULL_PAGE_DATA =
  "managemapper/SET_FULL_PAGE_DATA";
export const MANAGE_MAPPER_SET_TOAST_INFO = "managemapper/SET_TOAST_INFO";
export const MANAGE_MAPPER_SET_PAGE_DATA = "managemapper/SET_PAGE_DATA";
export const MANAGE_MAPPER_SET_MAPPING_DATA = "managemapper/SET_MAPPING_DATA";
export const MANAGE_MAPPER_SET_FILTER_DATA = "managemapper/SET_FILTER_DATA";
export const MANAGE_MAPPER_SET_FILTER_DATA_EDIT =
  "managemapper/SET_FILTER_DATA_EDIT";
export const MANAGE_MAPPER_OLD_FILE_DATA = "managemapper/OLD_FILE_DATA";
export const MANAGE_MAPPER_GET_API_RESPONSE = "managemapper/GET_API_RESPONSE";
export const MANAGE_MAPPER_GET_API_REQUEST = "managemapper/GET_API_REQUEST";
export const MANAGE_MAPPER_GET_API_ERROR = "managemapper/N_GET_API_ERROR";
export const MANAGE_MAPPER_POST_API_RESPONSE = "managemapper/ST_API_RESPONSE";
export const MANAGE_MAPPER_POST_API_ERROR = "managemapper/_POST_API_ERROR";
export const MANAGE_MAPPER_POST_API_ERROR_MESSAGE =
  "managemapper/_POST_API_ERROR_MESSAGE";
export const MANAGE_MAPPER_POST_API_REQUEST = "managemapper/POST_API_REQUEST";
export const MANAGE_MAPPER_GET_API_TARGET = "manafemapper/GET_API_TARGET";
export const MANAGE_MAPPER_POST_API_TARGET = "manafemapper/POST_API_TARGET";
export const MANAGE_MAPPER_UPDATE_API_MAPPINGS =
  "managemapper/UPDATE_API_MAPPINGS";

export const MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE =
  "managemapper/GET_FILEUPLOAD_API_RESPONSE";
export const MANAGE_MAPPER_BASIC_INFORMATION = "managemapper/BASIC_INFORMATION";
export const MANAGE_MAPPER_POST_API_FILEUPLOAD_RESPONSE =
  "managemapper/POST_FILEUPLOAD_API_RESPONSE";
export const MANAGE_OBJECT_MAPPER_SET_PAGE_DATA =
  "managemapper/OBJECT_PAGE_DATA";
export const setManageMapperSelectedMenu = (payload) => ({
  type: MANAGE_MAPPER_SET_SELECTED_MENU,
  payload,
});

export const setFileUploadData = (payload) => ({
  type: MANAGE_MAPPER_POST_API_FILEUPLOAD_RESPONSE,
  payload,
});

export const setMapperPostRequest = () => ({
  type: MANAGE_MAPPER_POST_API_REQUEST,
});

export const setMapperPostResponse = (payload) => ({
  type: MANAGE_MAPPER_POST_API_RESPONSE,
  payload,
});

export const setManageMapperFlow = (payload) => ({
  type: MANAGE_MAPPER_SET_FLOW,
  payload,
});

export const setManageMapperLoader = (payload) => ({
  type: MANAGE_MAPPER_SET_LOADER,
  payload,
});

export const setManageMapperFullPageData = (payload) => ({
  type: MANAGE_MAPPER_SET_FULL_PAGE_DATA,
  payload,
});

export const setManageMapperToastInfo = (payload) => ({
  type: MANAGE_MAPPER_SET_TOAST_INFO,
  payload,
});

export const setManageMapperPageLevelData = (payload) => ({
  type: MANAGE_MAPPER_SET_PAGE_DATA,
  payload,
});
export const setManageMapperTargetStep = (payload) => ({
  type: MANAGE_MAPPER_POST_API_TARGET,
  payload,
});

export const setMapperPageLevelData = (payload) => ({
  type: MANAGE_OBJECT_MAPPER_SET_PAGE_DATA,
  payload,
});

export const setMapperMappingData = (payload, dispatch, state) => ({
  type: MANAGE_MAPPER_SET_MAPPING_DATA,
  payload,
});

export const setMapperFilterData = (payload, dispatch, state) => ({
  type: MANAGE_MAPPER_SET_FILTER_DATA,
  payload,
});

export const setMapperFilterDataEdit = (payload, dispatch, state) => ({
  type: MANAGE_MAPPER_SET_FILTER_DATA_EDIT,
  payload,
});

export const setBasicInformation = (payload) => ({
  type: MANAGE_MAPPER_BASIC_INFORMATION,
  payload,
});

export const setOldFileName = (payload) => ({
  type: MANAGE_MAPPER_OLD_FILE_DATA,
  payload,
});

const apiCall = (payload, mapType) => {
  if (mapType == 2) return getOutputProfileData(payload);
  else if (mapType == 3) return getPassthroughProfileData(payload);
  else return getProfileData(payload);
};

export const getProfileDetailsAction = (payload, dispatch, mapType) => {
  dispatch({
    type: MANAGE_MAPPER_GET_API_REQUEST,
  });
  return apiCall(payload, mapType)
    .then(async (response) => {
      var outputTemplateMaps;
      if (
        mapType == 3 &&
        response["outputProfile"] !== null &&
        response["outputProfile"] !== undefined
      ) {
        try {
          outputTemplateMaps = JSON.parse(response["outputProfile"])[
            "OutputTemplateMaps"
          ];
          response = { ...response, outputTemplateMaps };
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
      dispatch({
        type: MANAGE_MAPPER_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_MAPPER_GET_API_ERROR,
        payload: error,
      });
    });
};

export const getMappingProfilesAction = () => {
  return getMappingProfiles()
    .then((response) => {
      return response;
    })
    .catch((_) => {
      return { isSucessful: false };
    })
    .finally((_) => {
      //Loading Stop
    });
};

export const UploadTargetFile = (payload, profileId, configure) => {
  let formData = new FormData();
  formData.append("targetFileFormat", payload.format);
  formData.append("configuration", JSON.stringify(configure));
  formData.append("id", profileId);
  formData.append("file", payload.uploadTargetFields[0]);
  return saveOnTargetProfileCreate(formData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const UploadSourceFile = (payload, dispatch, state) => {
  const { basicInformation, values, configure } = payload;
  let configuration = JSON.stringify(configure);
  configuration = configuration?.replace(/""/g, "null");
  const planProfiles = basicInformation.planProfileMappings;
  let formData = new FormData();
  formData.append("fileType", values.fileType);
  formData.append("format", values.format);
  formData.append("id", get(state, "api.data.id", 0));
  formData.append("configuration", configuration);
  formData.append("requireFtp", values.requireFtp);
  formData.append("allowEmptyInputFile", values.allowEmptyInputFile);
  if (values.requireFtp) {
    formData.append("ftpUrl", values.ftpUrl);
    formData.append("sftpPortNumber", values.sftpPortNumber);
    formData.append("ftpPath", values.ftpPath);
    formData.append("username", values.username);
    formData.append("password", values.password);
  }
  formData.append("file", values.uploadSourceFile[0]);
  let extension = values.uploadSourceFile[0].path.slice(-5);
  if (extension != ".yaml") {
    if (state.mapType == 3) {
      return saveOnSourceProfileCreate(formData)
        .then((res) => {
          if (res.isSuccess) {
            dispatch({
              type: MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
              payload: res,
            });
            dispatch({
              type: MANAGE_MAPPER_GET_API_RESPONSE,
              payload: res.mappingConfiguration ?? res.passthroughProfile,
            });
          }
          return res;
        })
        .catch((error) => {
          throw error;
        });
    } else {
      return onProfileCreate(formData)
        .then((res) => {
          dispatch({
            type: MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
            payload: res,
          });
          return res;
        })
        .catch((error) => {
          throw error;
        });
    }
  } else {
    return saveProfileFromYaml(formData)
      .then((res) => {
        dispatch({
          type: MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
          payload: res,
        });
        dispatch(
          setMapperPageLevelData({
            formName: "load_definition_filter",
            fieldData: null,
          })
        );
        return res;
      })
      .catch((error) => {
        throw error;
      });
  }
};

export const TempMappingUploadSourceFile = (payload, dispatch) => {
  const { basicInformation, values, configure } = payload;
  const configuration = JSON.stringify(configure);
  let formData = new FormData();
  formData.append("createdBy", basicInformation.createdBy);
  formData.append("isOutput", basicInformation.isOutput);
  formData.append("mapType", basicInformation.mapType);
  formData.append("uploadedFileType", values.uploadedFileType);
  formData.append("fileType", values.fileType);
  formData.append("format", values.format);
  formData.append("configuration", configuration);
  formData.append("file", values.uploadSourceFile[0]);
  let extension = values.uploadSourceFile[0].path.slice(-5);
  if (extension != ".yaml") {
    return tempMappingOnProfileCreate(formData)
      .then((res) => {
        dispatch({
          type: MANAGE_MAPPER_POST_API_RESPONSE,
          payload: res.mappingConfiguration,
        });
        dispatch({
          type: MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
          payload: res,
        });
        return res;
      })
      .catch((error) => {
        throw error;
      });
  } else {
    return saveProfileFromYaml(formData)
      .then((res) => {
        dispatch({
          type: MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
          payload: res,
        });
        dispatch(
          setMapperPageLevelData({
            formName: "load_definition_filter",
            fieldData: null,
          })
        );
        return res;
      })
      .catch((error) => {
        throw error;
      });
  }
};

export const SubmitMapperProfileOverview = (payload, dispatch) => {
  const { values } = payload;
  const planProfiles = "";
  // let formData = new FormData();
  dispatch({
    type: MANAGE_MAPPER_POST_API_REQUEST,
  });
  // formData.append("name", basicInformation.name);

  return onProfileCreate(values)
    .then((res) => {
      dispatch({
        type: MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const UpdateApiMappings = (payload) => ({
  type: MANAGE_MAPPER_UPDATE_API_MAPPINGS,
  payload,
});
