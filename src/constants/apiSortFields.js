const SORT_FIELDS = {
  drug: ["id", "latestChangeDate", "updatedDate"],
  trial: ["id", "trialStartDate", "trialPrimaryCompletionDate", "trialPrimaryEndpointsReported", "trialLastModifiedDate", "updatedDate"],
  organization: ["id", "organizationLastTrialStartDate", "updatedDate"],
  investigator: ["id", "investigatorLastTrialStartDate", "updatedDate"],
};

module.exports = {
  SORT_FIELDS,
};
