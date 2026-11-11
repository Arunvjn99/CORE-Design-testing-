import React, { useEffect, useState } from "react";
import DocumentDeliveryTable from "./DocumentDeliveryTable";
import { useRouterParams } from "@/abstracts/hooks";
import { useNavigate } from "react-router";
import {
  saveDocumentDeliveryEmployeeMap,
  getDocumentDeliveryEmployeeMap,
} from "../../../../services/Documents";
import FormLeaveGuard from "@/components/FormLeaveGuard";

const DELIVERY_MODE_ENUM = {
  email: 1,
  emailPost: 2,
};

const DELIVERY_MODE_REVERSE = { 1: "email", 2: "emailPost" };

const DocumentDelivery = ({ setIsInnerFormDirty }) => {
  const { censusId, planId } = useRouterParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [originalDocuments, setOriginalDocuments] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  useEffect(() => {
    return () => setIsInnerFormDirty?.(false);
  }, []);

  useEffect(() => {
    if (!planId) return;
    getDocumentDeliveryEmployeeMap(planId, censusId)
      .then((response) => {
        const raw = response;
        const apiDocs = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.documentDeliveries)
          ? raw.documentDeliveries
          : Array.isArray(raw?.data?.documentDeliveries)
          ? raw.data.documentDeliveries
          : Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.items)
          ? raw.items
          : null;

        if (apiDocs && apiDocs.length > 0) {
          // Build list from all API records — use record id as unique row key
          setDocuments(
            apiDocs.map((apiDoc) => ({
              id: apiDoc.id,
              documentTypeId: apiDoc.documentTypeId,
              recordId: apiDoc.id,
              name:
                apiDoc.documentTypeName ?? `Document ${apiDoc.documentTypeId}`,
              sub: null,
              deliveryMode:
                DELIVERY_MODE_REVERSE[apiDoc.documentDeliveryMode] ?? "email",
              documentType: null,
              documentDeliveryPlanMapId: apiDoc.documentDeliveryPlanMapId ?? 0,
              isDisabled: apiDoc.isDisabled ?? false,
              optedDate: apiDoc.optedDate ?? null,
            }))
          );
        } else {
          setDocuments([]);
        }
      })
      .catch((_err) => {});
  }, [planId]);

  const handleDeliveryModeChange = (id, value) => {
    setIsDirty(true);
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== id) return doc;
        const updated = { ...doc, deliveryMode: value };
        if (value === "emailPost" && doc.deliveryMode !== "emailPost") {
          updated.optedDate = new Date().toISOString();
        }
        return updated;
      })
    );
  };

  const enterEditMode = () => {
    setOriginalDocuments(documents.map((doc) => ({ ...doc })));
    setIsDirty(false);
    setDisabled(false);
    setIsInnerFormDirty?.(true);
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowLeaveModal(true);
    } else {
      setDocuments(originalDocuments);
      exitEditMode();
    }
  };

  const exitEditMode = () => {
    setIsDirty(false);
    setDisabled(true);
    setIsInnerFormDirty?.(false);
  };

  const handleSave = () => {
    const parsedPlanId = parseInt(planId);
    const parsedEmployeeId = parseInt(censusId);
    const payload = {
      planId: parsedPlanId,
      employeeId: parsedEmployeeId,
      documentDeliveries: documents.map((doc) => ({
        id: doc.recordId ?? 0,
        documentTypeId: doc.documentTypeId,
        documentTypeName: doc.name ?? null,
        documentDeliveryMode: DELIVERY_MODE_ENUM[doc.deliveryMode] ?? 1,
        planId: parsedPlanId,
        employeeId: parsedEmployeeId,
        documentDeliveryPlanMapId: doc.documentDeliveryPlanMapId ?? 0,
        isDisabled: doc.isDisabled ?? false,
        optedDate: doc.optedDate ?? null,
      })),
    };
    setIsSaving(true);
    saveDocumentDeliveryEmployeeMap(payload)
      .then(() => {
        exitEditMode();
      })
      .catch(() => {})
      .finally(() => setIsSaving(false));
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="core-heading-regular">Document Delivery</div>
        <div className="d-flex gap-2">
          {disabled && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/employees")}
            >
              Cancel
            </button>
          )}
          {!disabled && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
          <button
            className="btn btn-primary btn-sm"
            onClick={disabled ? enterEditMode : handleSave}
            disabled={isSaving}
          >
            {disabled ? "Edit" : isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <hr />
      <div className="core-sub-heading mb-3">Choose Document Delivery Mode</div>
      <DocumentDeliveryTable
        documents={documents}
        disabled={disabled}
        isRowDisabled={() => disabled}
        onDeliveryModeChange={handleDeliveryModeChange}
      />
      <FormLeaveGuard
        showModal={showLeaveModal}
        handleConfirmClick={() => {
          setShowLeaveModal(false);
          setDocuments(originalDocuments);
          exitEditMode();
        }}
        handleCancelClick={() => setShowLeaveModal(false)}
      />
    </div>
  );
};

export default DocumentDelivery;
