import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import moment from "moment";
import DataTable from "@/components/DataTable";
import Table from "@/components/CsplTable";
import AddToolTip from "@/components/AddToolTip";
import SliderPanel from "@/components/SliderPanel";
import { useRouterParams, useDeepEffect } from "@/abstracts/hooks";
import {
  getEmployeeEnrollment,
  getEmployeePlanElectionHistory,
} from "@/services/enrollment";
import ManualEnrollmentContainer from "../../ManualEnrollmentContainer";
import { parseUTCToLocal } from "@/utils/helpers";
import axios from "axios";
import SDBDetailsContainer from "../SDBDetailsContainer";

const PAGE_SIZE = 20;

const historyColumns = [
  {
    label: "Field",
    className: "w-22_5",
    valueclassName: "w-22_5 align-items-center min-w-0 overflow-hidden",
    columnName: "field",
    isSortable: true,
  },
  {
    label: "Date/Time",
    className: "w-12_5",
    valueclassName: "w-12_5 align-items-center min-w-0 overflow-hidden",
    columnName: "dateTime",
    isSortable: true,
  },
  {
    label: "Previous value",
    className: "w-20",
    valueclassName: "w-20 align-items-center min-w-0 overflow-hidden",
    columnName: "previousValue",
    isSortable: true,
  },
  {
    label: "Updated value",
    className: "w-20",
    valueclassName: "w-20 align-items-center min-w-0 overflow-hidden",
    columnName: "updatedValue",
    isSortable: true,
  },
  {
    label: "Updated by",
    className: "w-25",
    valueclassName: "w-25 align-items-center min-w-0 overflow-hidden",
    columnName: "updatedBy",
    isSortable: true,
    isHistoryTable: true,
  },
];

const investmentColumns = [
  {
    label: "Date/Time",
    className: "w-15",
    valueclassName: "w-15 align-items-center min-w-0 overflow-hidden",
    columnName: "dateTime",
    isSortable: true,
  },
  {
    label: "Source name",
    className: "w-15",
    valueclassName: "w-15 align-items-center min-w-0 overflow-hidden",
    columnName: "sourceName",
    isSortable: true,
  },
  {
    label: "Investment",
    className: "w-15",
    valueclassName: "w-15 align-items-center min-w-0 overflow-hidden",
    columnName: "investment",
    isSortable: true,
  },
  {
    label: "Previous value",
    className: "w-10",
    valueclassName: "w-10 align-items-center min-w-0 overflow-hidden",
    columnName: "previousValue",
    isSortable: true,
  },
  {
    label: "Updated value",
    className: "w-10",
    valueclassName: "w-10 align-items-center min-w-0 overflow-hidden",
    columnName: "updatedValue",
    isSortable: true,
  },
  {
    label: "Updated through",
    className: "w-15",
    valueclassName: "w-15 align-items-center min-w-0 overflow-hidden",
    columnName: "updatedThrough",
    isSortable: true,
  },
  {
    label: "Updated by",
    className: "w-20",
    valueclassName: "w-20 align-items-center min-w-0 overflow-hidden",
    columnName: "updatedBy",
    isSortable: true,
  },
];

const Deferrals = () => {
  const { censusId, planId } = useRouterParams();
  const intPlanId = parseInt(planId, 10);
  const employeeId = parseInt(censusId, 10);

  const [activeTab, setActiveTab] = useState(1);

  const [historyData, setHistoryData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [stopInfiniteScroll, setStopInfiniteScroll] = useState(false);
  const [getParticipantEnrollmentInfo, setGetParticipantEnrollmentInfo] =
    useState({});
  const [saveInvestments, setSaveInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [restricted, setRestricted] = useState(false);
  const [getIsOptOutAccess, setIsOptOutAccess] = useState(false);
  const [getIsOptedOut, setIsOptedOut] = useState(false);
  let source = axios.CancelToken.source();
  const [request, setRequest] = useState({
    employeeId,
    planId: intPlanId,
    from: 0,
    offset: PAGE_SIZE,
  });

  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [selectedChanges, setSelectedChanges] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatDisplayValue = (val) =>
    val == null || val === "" || Number.isNaN(val) ? "-" : String(val);

  // Reset paging and reload whenever the participant or plan changes, so a
  // previous participant's rows / scroll position don't carry over.
  useDeepEffect(() => {
    setHistoryData([]);
    setTotalCount(0);
    setStopInfiniteScroll(false);
    setRequest({
      employeeId,
      planId: intPlanId,
      from: 0,
      offset: PAGE_SIZE,
    });
  }, [intPlanId, employeeId]);

  // Fetch is driven entirely by `request` (which carries the identity), so an
  // identity change flows through the reset above rather than firing a stale
  // fetch here. A subsequent page (from > 0) appends; a fresh load replaces.

  useEffect(() => {
    getEmployeeEnrollment(
      { planId: planId, employeeId: censusId },
      source.token
    )
      .then((response) => {
        setLoading(false);
        setRestricted(response.isRestricted);
        setIsOptOutAccess(response.isOptOutAccess);
        setIsOptedOut(response.isOptedOut);
        setGetParticipantEnrollmentInfo(response.employeePlanMap);
        if (
          response.employeePlanMap.doesAllSourcesFollowSameElection != null &&
          response.employeePlanMap.doesAllSourcesFollowSameElection
        ) {
          setSaveInvestments(response.employeePlanMap.electedInvestments);
        }
      })
      .catch((ex) => setLoading(false));
  }, [activeTab]);

  useEffect(() => {
    if (!request.planId || !request.employeeId) {
      return;
    }
    setIsLoading(true);
    getEmployeePlanElectionHistory(request)
      .then((res) => {
        const newRows = res?.rows ?? [];
        if (newRows.length < request.offset) {
          setStopInfiniteScroll(true);
        }
        setHistoryData((prev) =>
          request.from > 0 ? [...(prev ?? []), ...newRows] : newRows
        );
        setTotalCount(res?.totalCount ?? 0);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [request]);

  const loadMoreFunc = () => {
    setRequest((prev) => ({
      ...prev,
      from: historyData?.length ?? 0,
    }));
  };

  const refreshHistory = () => {
    setHistoryData([]);
    setTotalCount(0);
    setStopInfiniteScroll(false);
    setRequest({
      employeeId,
      planId: intPlanId,
      from: 0,
      offset: PAGE_SIZE,
    });
  };

  const handleViewChanges = (changes) => {
    setSelectedChanges(changes ?? []);
    setIsSliderOpen(true);
  };

  const buildCell = (col, data, idx) => {
    if (col.columnName === "dateTime") {
      const raw = data?.[col.columnName];
      return (
        <Table.Td key={idx} className={col.valueclassName}>
          <div>
            <div className="core-body-text-regular-medium-secondary">
              {raw ? moment(parseUTCToLocal(raw)).format("MM/DD/YYYY") : "-"}
            </div>
            {raw && (
              <div className="core-body-text-regular-medium-sl">
                {moment(parseUTCToLocal(raw)).format("HH:mm")}
              </div>
            )}
          </div>
        </Table.Td>
      );
    }

    if (col.isHistoryTable && col.columnName === "updatedBy") {
      const updatedByValue = data?.updatedBy ?? "";
      const updatedThroughValue = formatDisplayValue(data?.updatedThrough);
      return (
        <Table.Td key={idx} className={col.valueclassName}>
          <div className="min-w-0">
            {updatedByValue ? (
              <>
                <AddToolTip
                  className="core-body-text-large-semi-bold"
                  name={updatedByValue}
                  showOnEllipsisOnly
                >
                  {updatedByValue}
                </AddToolTip>
                <div className="core-body-text-regular-medium-sl">
                  {updatedThroughValue}
                </div>
              </>
            ) : (
              <AddToolTip
                className="core-body-text-large-semi-bold"
                name={updatedThroughValue}
                showOnEllipsisOnly
              >
                {updatedThroughValue}
              </AddToolTip>
            )}
          </div>
        </Table.Td>
      );
    }

    return (
      <Table.Td key={idx} className={col.valueclassName}>
        <div className="min-w-0">
          <AddToolTip
            className="core-body-text-regular-medium-secondary"
            name={data?.[col.columnName]}
            showOnEllipsisOnly
          >
            {formatDisplayValue(data?.[col.columnName])}
          </AddToolTip>
        </div>
      </Table.Td>
    );
  };

  const getContent = (data) => {
    const hasChanges = Array.isArray(data?.changes) && data.changes.length > 0;
    return historyColumns.map((col, idx) => {
      if (hasChanges && col.columnName === "previousValue") {
        return (
          <Table.Td key={idx} className={col.valueclassName}>
            <div
              className="view-changes-link"
              onClick={() => handleViewChanges(data.changes)}
            >
              View Changes
            </div>
          </Table.Td>
        );
      }
      if (hasChanges && col.columnName === "updatedValue") {
        return <Table.Td key={idx} className={col.valueclassName} />;
      }
      return buildCell(col, data, idx);
    });
  };

  const getInvestmentContent = (data) => {
    return investmentColumns.map((col, idx) => buildCell(col, data, idx));
  };

  return (
    <div className="deferrals-container mt-4">
      <Tabs
        activeKey={activeTab}
        transition={false}
        onSelect={handleTabChange}
        mountOnEnter
        unmountOnExit
      >
        <Tab eventKey={1} title="Elections">
          <div className="mt-4">
            <ManualEnrollmentContainer
              getParticipantEnrollmentInfo={getParticipantEnrollmentInfo}
              setGetParticipantEnrollmentInfo={setGetParticipantEnrollmentInfo}
              saveInvestments={saveInvestments}
              setSaveInvestments={setSaveInvestments}
              loading={loading}
              setLoading={setLoading}
              restricted={restricted}
              setRestricted={setRestricted}
              getIsOptOutAccess={getIsOptOutAccess}
              setIsOptOutAccess={setIsOptOutAccess}
              getIsOptedOut={getIsOptedOut}
              setIsOptedOut={setIsOptedOut}
              onSaveSuccess={refreshHistory}
            />
          </div>
        </Tab>
        <Tab eventKey={2} title="History">
          <div className="mt-4">
            <div className="display-flex justify-content-between align-items-center mb-2">
              <div className="core-body-text-regular-semi-bold">
                {String(historyData?.length ?? 0).padStart(2, "0")}/
                {String(totalCount ?? 0).padStart(2, "0")}{" "}
                <span className="core-body-text-regular-semi-bold-sl">
                  - Record(s) found
                </span>
              </div>
            </div>
            <DataTable
              columns={historyColumns}
              Data={historyData}
              getContent={getContent}
              isLoading={isLoading}
              isInfiniteScroll={true}
              stopInfiniteScroll={stopInfiniteScroll}
              loadMoreFunc={loadMoreFunc}
              height="45vh"
              className="overflow-auto mb-5r"
              offset={PAGE_SIZE}
            />
          </div>
        </Tab>
        {getParticipantEnrollmentInfo?.optInForSdb && (
          <Tab eventKey={3} title="SDB Details">
            <SDBDetailsContainer
              employeeId={employeeId}
              planId={intPlanId}
              getParticipantEnrollmentInfo={getParticipantEnrollmentInfo}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </Tab>
        )}
      </Tabs>

      <SliderPanel
        isOpen={isSliderOpen}
        onClose={() => setIsSliderOpen(false)}
        header="Investment Election Changes"
        width="75%"
        screen="investment-election-changes-slider"
      >
        <div className="mt-1">
          <div className="display-flex justify-content-between align-items-center mb-2">
            <div className="core-body-text-regular-semi-bold">
              {String(selectedChanges?.length ?? 0).padStart(2, "0")}{" "}
              <span className="core-body-text-regular-semi-bold-sl">
                - Record(s) found
              </span>
            </div>
          </div>
          <DataTable
            columns={investmentColumns}
            Data={selectedChanges}
            getContent={getInvestmentContent}
            height="60vh"
            className="overflow-auto"
          />
        </div>
      </SliderPanel>
    </div>
  );
};

export default Deferrals;
