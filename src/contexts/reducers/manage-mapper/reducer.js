import { get } from "lodash-es";
import {
  MANAGE_MAPPER_SET_FLOW,
  MANAGE_MAPPER_SET_SELECTED_MENU,
  MANAGE_MAPPER_SET_LOADER,
  MANAGE_MAPPER_SET_FULL_PAGE_DATA,
  MANAGE_MAPPER_SET_TOAST_INFO,
  MANAGE_MAPPER_SET_PAGE_DATA,
  MANAGE_MAPPER_SET_MAPPING_DATA,
  MANAGE_MAPPER_SET_FILTER_DATA,
  MANAGE_MAPPER_SET_FILTER_DATA_EDIT,
  MANAGE_MAPPER_OLD_FILE_DATA,
  MANAGE_MAPPER_GET_API_RESPONSE,
  MANAGE_MAPPER_GET_API_REQUEST,
  MANAGE_MAPPER_GET_API_ERROR,
  MANAGE_MAPPER_POST_API_RESPONSE,
  MANAGE_MAPPER_POST_API_ERROR,
  MANAGE_MAPPER_POST_API_ERROR_MESSAGE,
  MANAGE_MAPPER_POST_API_REQUEST,
  MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE,
  MANAGE_MAPPER_POST_API_FILEUPLOAD_RESPONSE,
  MANAGE_MAPPER_BASIC_INFORMATION,
  MANAGE_OBJECT_MAPPER_SET_PAGE_DATA,
  MANAGE_MAPPER_GET_API_TARGET,
  MANAGE_MAPPER_POST_API_TARGET,
  MANAGE_MAPPER_UPDATE_API_MAPPINGS,
} from "./actions";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MANAGE_MAPPER_SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    case MANAGE_MAPPER_SET_FLOW:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_MAPPER_SET_FULL_PAGE_DATA:
      return {
        ...state,
        ...payload,
      };
    case MANAGE_MAPPER_SET_LOADER:
      return {
        ...state,
        isLoading: payload,
      };
    case MANAGE_OBJECT_MAPPER_SET_PAGE_DATA: {
      const { formName, fieldData, format } = payload;
      return {
        ...state,
        api: {
          ...state.api,

          data: {
            ...state.api.data,
            format: format,
          },
        },
        [formName]: { ...fieldData },
      };
    }

    case MANAGE_MAPPER_SET_PAGE_DATA: {
      const { formName, fieldData } = payload;
      return {
        ...state,
        api: {
          ...state.api,
          data: {
            ...state.api.data,
            [formName]: fieldData,
          },
        },
      };
    }
    case MANAGE_MAPPER_SET_TOAST_INFO: {
      return {
        ...state,
        showToast: get(payload, "showToast", false),
        toastMessage: get(payload, "toastMessage", ""),
      };
    }
    case MANAGE_MAPPER_SET_MAPPING_DATA: {
      return {
        ...state,
        mappingData: payload,
      };
    }
    case MANAGE_MAPPER_BASIC_INFORMATION: {
      return {
        ...state,
        basicInformation: payload,
      };
    }
    case MANAGE_MAPPER_GET_API_REQUEST:
    case MANAGE_MAPPER_POST_API_REQUEST:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: true,
          error: null,
        },
      };
    case MANAGE_MAPPER_GET_API_RESPONSE:
    case MANAGE_MAPPER_POST_API_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          data: payload,
          isError: false,
        },
      };
    case MANAGE_MAPPER_GET_API_ERROR:
    case MANAGE_MAPPER_POST_API_ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          error: payload,
        },
      };
    case MANAGE_MAPPER_POST_API_ERROR_MESSAGE:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          errorMessage: payload,
          error: "500",
        },
      };
    case MANAGE_MAPPER_GET_API_TARGET:
    case MANAGE_MAPPER_POST_API_TARGET:
      return {
        ...state,
        api: {
          ...state.api,
          isFetching: false,
          isError: true,
          targetStep: payload,
        },
      };
    case MANAGE_MAPPER_GET_API_FILEUPLOAD_RESPONSE:
    case MANAGE_MAPPER_POST_API_FILEUPLOAD_RESPONSE:
      return {
        ...state,
        api: {
          ...state.api,
          data: {
            ...state.api.data,
          },
          isFetching: false,
          fileuploadData: payload,
          isError: false,
        },
      };

    case MANAGE_MAPPER_SET_FILTER_DATA:
      return {
        ...state,
        api: {
          ...state.api,
          fileuploadData: {
            ...state.api.fileuploadData,
            mappingConfiguration: {
              ...state.api.fileuploadData.mappingConfiguration,
              headerMapJson: payload.headerMapJson,
            },
            row: payload.row,
          },
        },
      };

    case MANAGE_MAPPER_SET_FILTER_DATA_EDIT:
      return {
        ...state,
        api: {
          ...state.api,
          data: {
            ...state.api.data,
            headerMapJson: payload.headerMapJson,
          },
        },
      };

    case MANAGE_MAPPER_OLD_FILE_DATA:
      return {
        ...state,
        api: {
          ...state.api,
          fileuploadData: {
            ...state.api.fileuploadData,
            mappingConfiguration: {
              ...state.api.fileuploadData.mappingConfiguration,
              fileName: payload.fileName,
            },
          },
        },
      };
    case MANAGE_MAPPER_UPDATE_API_MAPPINGS:
      return {
        ...state,
        api: {
          ...state?.api,
          data: {
            ...state?.api?.data,
            ...{ [payload?.modelName]: payload?.data },
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
