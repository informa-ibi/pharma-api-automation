const commonFields = ["copyrightNotice", "$type"];
const queryFields = {
  trial: [
    "trialTitle",
    "trialStatus",
    "trialPhase",
    "trialPrimaryEndpointsReported",
    "trialCountries",
    "trialTherapeuticAreas",
    "trialObjective",
    "trialPatientPopulation",
    "trialTreatmentPlan",
    "trialProtocolIDs",
    "trialSponsors",
    "trialPrimaryDrugsTested",
    "trialResults",
    "trialInvestigators",
    "trialRecordType",
  ],
  investigator: [
    "investigatorId",
    "investigatorNPI",
    "investigatorFirstName",
    "investigatorMiddleInitial",
    "investigatorLastName",
    "investigatorPrimaryOrganization",
    "investigatorEmails",
    "investigatorPhoneNumbers",
    "investigatorDegrees",
    "investigatorDiseaseTiers",
    "investigatorRegions",
    "diseaseHierarchy",
    "investigatorFaxes",
    "investigatorLocation",
    "investigatorGeoLocation",
  ],
  organization: [
    "organizationId",
    "organizationName",
    "organizationType",
    "organizationPhoneNumbers",
    "organizationFaxNumbers",
    "organizationLastTrialStartDate",
    "organizationSupportingUrls",
    "organizationRegions",
    "organizationLocation",
    "organizationPrimaryInvestigators",
    "organizationTotalTrials",
    "organizationTotalPastTrials",
    "organizationTrials",
    "pastTrials",
    "organizationCountryName",
    "organizationDiseaseTypes",
  ],
  drug: [
    "drugId",
    "drugPrimaryName",
    "drugNameSynonyms",
    "overview",
    "globalStatus",
    "developmentStatus",
    "originatorName",
    "originatorStatus",
    "originatorCompanyKey",
    "licensee",
    "indicationGroups",
    "keyEvents",
    "therapeuticClasses",
    "mechanismsOfAction",
    "origin",
    "targets",
  ],
  drugCompany: [
    "companyId",
    "companyName",
    "companySymbol",
    "companyStockExchange",
    "companyAddress1",
    "companyCountry",
    "companyState",
    "companyCity",
    "companyPostalCode",
    "companyTelephone",
    "companyWebsite",
    "researchFocus",
    "financials",
    "companyEmployees",
    "yearEstablished",
    "ownershipType",
    "parentCompanyId",
    "yearAcquired",
    "supportingURL",
  ],
  drugProgram: [
    "drugId",
    "drugPrimaryName",
    "drugNameSynonyms",
    "globalStatus",
    "highestDevelopmentStatus",
    "regionName",
    "countryCode",
    "countryName",
    "mechanismOfAction",
    "diseaseName",
    "companyRelationship",
    "companyId",
    "companyName",
    "parentCompanyId",
    "currentDevelopmentStatus",
    "currentStatus",
    "highestStatusReached",
    "indicationGroup",
  ],
  drugTrends: [
    "drugId",
    "drugPrimaryName",
    "bmtDrug",
    "years",
  ],
  organizationHierarchy: [
    "organizationId",
    "organizationName",
    "parentOrganizationId",
    "childOrganizationIds",
    "siblingOrganizationIds",
    "updatedDate",
    "recordUrl",
  ],
};

module.exports = {
  commonFields,
  queryFields,
};
