import {
  getPayrollMetaDataDetails,
  getExistingEmployeeDetails,
  getFileGraphInformationById,
  getFilesBasedOnSearch,
  getPayrollEmployeeDetails,
  getFileInformationByFileId,
  payrollAndCensusFileUpload,
  tempMappingFileUpload,
  deleteUploadedFileById,
  getWarningsInECR,
  getErrorsInECR,
  getAllRecords,
  getFilesCountBasedOnSearch,
  getDownloadPayrollReport,
  iraFileUpload,
  getIraFilesBasedOnSearch,
} from "@/services/payroll";

import { PAYROLL_RECORDS_TO_FETCH } from "@/utils/constants/payroll";
import { usDateFormat } from "@/utils/helpers";
import { get, isEmpty } from "lodash-es";
import axios from "axios";
import { MANAGE_CENSUS_POST_API_ERROR } from "../manage-census";
import { finchFileUploadService } from "../../../services/finch";

export const MANAGE_PAYROLL_SET_FLOW = "manageeligibility/SET_FLOW";
export const MANAGE_PAYROLL_SET_SELECTED_MENU =
  "manageeligibility/SET_SELECTED_MENU";
export const MANAGE_PAYROLL_SET_LOADER = "manageeligibility/SET_LOADER";
export const MANAGE_PAYROLL_SET_FULL_PAGE_DATA =
  "manageeligibility/SET_FULL_PAGE_DATA";
export const MANAGE_PAYROLL_SET_TOAST_INFO = "manageeligibility/SET_TOAST_INFO";
export const MANAGE_PAYROLL_SET_PAGE_DATA = "manageeligibility/SET_PAGE_DATA";
export const MANAGE_PAYROLL_GET_API_RESPONSE =
  "manageeligibility/ET_API_RESPONSE";
export const MANAGE_PAYROLL_FILE_STATUSES = "managepayroll/fileStatuses";
export const MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE =
  "managePayroll/GET_API_FILEUPLOAD_RESPONSE";
export const MANAGE_PAYROLL_GET_API_REQUEST =
  "manageeligibility/GET_API_REQUEST";
export const MANAGE_PAYROLL_GET_API_ERROR = "manageeligibility/N_GET_API_ERROR";
export const MANAGE_PAYROLL_POST_API_RESPONSE =
  "manageeligibility/POST_API_RESPONSE";
export const MANAGE_PAYROLL_POST_API_FILEUPLOAD_RESPONSE =
  "managePayroll/POST_API_FILEUPLOAD_RESPONSE";
export const MANAGE_PAYROLL_POST_API_ERROR =
  "manageeligibility/_POST_API_ERROR";
export const MANAGE_PAYROLL_POST_API_REQUEST =
  "manageeligibility/OST_API_REQUEST";
export const MANAGE_EXISTING_EMPLOYEE_DETAILS =
  "manageexisting/employee_api_response";
export const MANAGE_PAYROLL_GRAPH_GET_API_RESPONSE =
  "managepayrol/graph_api_response";
export const MANAGE_PAYROLL_ERROR_API_RESPONSE =
  "managepayroll/error_api_response";
export const MANAGE_PAYROLL_WARNING_API_RESPONSE =
  "managepayroll/warning_api_response";
export const MANAGE_PAYROLL_RECORDS_API_RESPONSE =
  "managepayroll/records_api_response";
export const MANAGE_PAYROLL_EMPLOYEE_DETAILS =
  "managepayroll/payroll_employee_records";
export const MANAGE_PAYROLL_FORM_DATA_LOCAL_CACHE =
  "managepayroll/CLEAR_LOCAL_CACHE";
export const MANAGE_PAYROLL_CLEAR_LOCAL_CACHE =
  "managepayroll/CLEAR_PAYROLL_LOCAL_CACHE";
export const MANAGE_PAYROLL_CLEAR = "managepayroll/MANAGE_PAYROLL_CLEAR";

export const setManagePayrollSelectedMenu = (payload) => ({
  type: MANAGE_PAYROLL_SET_SELECTED_MENU,
  payload,
});

export const setManagePayrollFlow = (payload) => ({
  type: MANAGE_PAYROLL_SET_FLOW,
  payload,
});

export const setManagePayrollLoader = (payload) => ({
  type: MANAGE_PAYROLL_SET_LOADER,
  payload,
});

export const setManagePayrollFullPageData = (payload) => ({
  type: MANAGE_PAYROLL_SET_FULL_PAGE_DATA,
  payload,
});

export const setManagePayrollToastInfo = (payload) => ({
  type: MANAGE_PAYROLL_SET_TOAST_INFO,
  payload,
});

export const setManagePayrollPageLevelData = (payload) => ({
  type: MANAGE_PAYROLL_SET_PAGE_DATA,
  payload,
});

//create payroll listing
export const getAllData = (payload, dispatch, state) => {
  const { payrollId, companyId } = payload;
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });
  return axios
    .all([
      getPayrollEmployeeDetails(payrollId),
      getExistingEmployeeDetails(companyId),
    ])
    .then(
      axios.spread((...responses) => {
        const payrollData = responses[0];
        const employeeData = responses[1];
        dispatch({
          type: MANAGE_EXISTING_EMPLOYEE_DETAILS,
          payload: employeeData,
        });
        dispatch({
          type: MANAGE_PAYROLL_EMPLOYEE_DETAILS,
          payload: payrollData,
        });
        return responses;
      })
    )
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

export const getPayrollMetaDataDetailAction = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });

  return getPayrollMetaDataDetails(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

export const getEmployeeDetails = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });
  return getExistingEmployeeDetails(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_EXISTING_EMPLOYEE_DETAILS,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

//managePayroll
export const getFileInfo = (payload, dispatch, state, setIsLoading) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });
  return getFileInformationByFileId(payload)
    .then((response) => {
      setIsLoading(false);
      dispatch({
        type: MANAGE_PAYROLL_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

export const getFileGraphInfo = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });
  return getFileGraphInformationById(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_GRAPH_GET_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const fileUploadForPayrollAndCensus = (payload, dispatch) => {
  var formData = new FormData();
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  formData.append("fileType", payload.fileType);
  formData.append("description", payload.description);
  formData.append("inputType", payload.inputType);
  formData.append("format", payload.format);
  formData.append("isSFTP", payload.isSFTP);
  formData.append(
    "isMultiplePlanOrPaydate",
    payload.payDateSource ? true : payload.isMultiplePlanOrPaydate
  );
  formData.append("file", payload.uploadCensusAndPayroll[0]);
  formData.append("planId", payload.planId);
  formData.append("payDate", usDateFormat(payload.payDate));
  formData.append("isYearEndProcessing", false);
  formData.append("payrollFrequencyId", payload.frequencyId ?? 0);
  formData.append("parentFileId", payload.parentFileId);
  return payrollAndCensusFileUpload(formData)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_POST_API_FILEUPLOAD_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
export const rolloverInIraFileUpload = (payload, dispatch) => {
  var formData = new FormData();
  console.log("ethgthbtegergegtehte: ", formData, payload);
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  formData.append("description", payload.description);
  formData.append("fileType", payload.fileTypeira);
  formData.append("template", payload.fileType);
  formData.append("format", payload.format);
  formData.append("file", payload.uploadCensusAndPayroll[0]);
  return iraFileUpload(formData)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_POST_API_FILEUPLOAD_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const fileUploadForTempMapping = (payload, dispatch) => {
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  return tempMappingFileUpload(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_POST_API_FILEUPLOAD_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPayrollDetailsAction = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  const apiData = get(state, "api.fileuploadData", []);
  const uploadedFileStatuses = get(state, "uploadedFileStatuses", {
    errorCorrection: 0,
    creationInProgress: 0,
    awaitingFunding: 0,
    pendingSubmission: 0,
    errorInFile: 0,
    completed: 0,
    deleted: 0,
  });
  return getFilesBasedOnSearch({
    ...payload,
  })
    .then((response) => {
      var obj = {};
      var total = 0;
      getFilesCountBasedOnSearch(payload).then((data) => {
        data.forEach((_) => {
          obj[_.fileStatus] = _.count;
          total += _.count;
        });
        dispatch({
          type: MANAGE_PAYROLL_FILE_STATUSES,
          payload: {
            errorCorrection: obj[3],
            creationInProgress: obj[1],
            awaitingFunding: obj[5],
            pendingSubmission: obj[4],
            errorInFile: obj[12],
            completed: obj[7],
            deleted: obj[9],
            total: total,
            obj: obj,
            stopTrigger:
              isEmpty(response) || response.length < PAYROLL_RECORDS_TO_FETCH
                ? true
                : false,
          },
        });
        if (!isEmpty(data) || !isEmpty(response)) {
          dispatch({
            type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
            payload: [...apiData, ...response],
          });
          return [...apiData, ...response];
        }
        dispatch({
          type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
          payload: [],
        });
        return [];
      });
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_CENSUS_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};
export const getPayrollDetailsActionIRA = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  const apiData = get(state, "api.fileuploadData", []);
  const uploadedFileStatuses = get(state, "uploadedFileStatuses", {
    errorCorrection: 0,
    creationInProgress: 0,
    awaitingFunding: 0,
    pendingSubmission: 0,
    errorInFile: 0,
    completed: 0,
    deleted: 0,
  });
  return getFilesBasedOnSearch({
    ...payload,
  })
    .then((response) => {
      var obj = {};
      var total = 0;
      getFilesCountBasedOnSearch(payload).then((data) => {
        data.forEach((_) => {
          obj[_.fileStatus] = _.count;
          total += _.count;
        });
        dispatch({
          type: MANAGE_PAYROLL_FILE_STATUSES,
          payload: {
            errorCorrection: obj[3],
            creationInProgress: obj[1],
            awaitingFunding: obj[5],
            pendingSubmission: obj[4],
            errorInFile: obj[12],
            completed: obj[7],
            deleted: obj[9],
            total: total,
            obj: obj,
            stopTrigger:
              isEmpty(response) || response.length < PAYROLL_RECORDS_TO_FETCH
                ? true
                : false,
          },
        });
        if (!isEmpty(data) || !isEmpty(response)) {
          dispatch({
            type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
            payload: [...apiData, ...response],
          });
          return [...apiData, ...response];
        }
        dispatch({
          type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
          payload: [],
        });
        return [];
      });
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_CENSUS_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const refreshPayrollDetails = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
    payload: [],
  });
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  const apiData = get(state, "api.fileuploadData", []);
  const uploadedFileStatuses = get(state, "uploadedFileStatuses", {
    errorCorrection: 0,
    creationInProgress: 0,
    awaitingFunding: 0,
    pendingSubmission: 0,
    errorInFile: 0,
    completed: 0,
    deleted: 0,
  });
  return getFilesBasedOnSearch({
    ...payload,
  })
    .then((response) => {
      getFilesCountBasedOnSearch(payload).then((data) => {
        var obj = {};
        var total = 0;
        data.forEach((_) => {
          obj[_.fileStatus] = _.count;
          total += _.count;
        });
        dispatch({
          type: MANAGE_PAYROLL_FILE_STATUSES,
          payload: {
            ...uploadedFileStatuses,
            errorCorrection: obj[3],
            creationInProgress: obj[1],
            awaitingFunding: obj[5],
            pendingSubmission: obj[4],
            errorInFile: obj[12],
            completed: obj[7],
            deleted: obj[9],
            total: total,
            obj: obj,
          },
        });
        if (!isEmpty(data) || !isEmpty(response)) {
          dispatch({
            type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
            payload: response,
          });
          return response;
        }

        dispatch({
          type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
          payload: [],
        });
        return [];
      });
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_CENSUS_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};
export const refreshIraPayrollDetails = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
    payload: [],
  });
  dispatch({
    type: MANAGE_PAYROLL_POST_API_REQUEST,
  });
  const apiData = get(state, "api.fileuploadData", []);
  const uploadedFileStatuses = get(state, "uploadedFileStatuses", {
    errorCorrection: 0,
    creationInProgress: 0,
    awaitingFunding: 0,
    pendingSubmission: 0,
    errorInFile: 0,
    completed: 0,
    deleted: 0,
  });
  return getIraFilesBasedOnSearch({
    ...payload,
  })
    .then((response) => {
      getFilesCountBasedOnSearch(payload).then((data) => {
        var obj = {};
        var total = 0;
        data.forEach((_) => {
          obj[_.fileStatus] = _.count;
          total += _.count;
        });
        dispatch({
          type: MANAGE_PAYROLL_FILE_STATUSES,
          payload: {
            ...uploadedFileStatuses,
            errorCorrection: obj[3],
            creationInProgress: obj[1],
            awaitingFunding: obj[5],
            pendingSubmission: obj[4],
            errorInFile: obj[12],
            completed: obj[7],
            deleted: obj[9],
            total: total,
            obj: obj,
          },
        });
        if (!isEmpty(data) || !isEmpty(response)) {
          dispatch({
            type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
            payload: response,
          });
          return response;
        }

        dispatch({
          type: MANAGE_PAYROLL_GET_API_FILEUPLOAD_RESPONSE,
          payload: [],
        });
        return [];
      });
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_CENSUS_POST_API_ERROR,
        payload: error,
      });
      throw error;
    });
};

export const deleteUploadedFile = (payload, dispatch) => {
  return deleteUploadedFileById(payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const errorList = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });

  return getErrorsInECR(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_ERROR_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

export const warningList = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });

  return getWarningsInECR(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_WARNING_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

export const recordList = (payload, dispatch, state) => {
  dispatch({
    type: MANAGE_PAYROLL_GET_API_REQUEST,
  });

  return getAllRecords(payload)
    .then((response) => {
      dispatch({
        type: MANAGE_PAYROLL_RECORDS_API_RESPONSE,
        payload: response,
      });
      return response;
    })
    .catch((error) => {
      dispatch({
        type: MANAGE_PAYROLL_GET_API_ERROR,
        payload: error,
      });
    });
};

export const clearFormDataLocalCache = () => ({
  type: MANAGE_PAYROLL_FORM_DATA_LOCAL_CACHE,
});
export const downloadPayrollReport = (payload) => {
  return getDownloadPayrollReport(payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const clearManagePayrollCache = (payload) => ({
  type: MANAGE_PAYROLL_CLEAR_LOCAL_CACHE,
  payload,
});

export const clearPayrollData = () => ({
  type: MANAGE_PAYROLL_CLEAR,
});

export const finchFileUpload = (payload) => {
  var formData = new FormData();
  formData.append("fileType", payload.fileType);
  formData.append("description", payload.description);
  formData.append("inputType", payload.inputType);
  formData.append("format", payload.format);
  formData.append("isSFTP", payload.isSFTP);
  formData.append("isMultiplePlanOrPaydate", payload.isMultiplePlanOrPaydate);
  formData.append("file", payload.finchFileUpload[0]);
  return finchFileUploadService(formData);
};
