const DRUG_SEARCH_PARAMETERS = ["id", "indicationgroup", "drugname", "globalstatus", "companyname", "ispharmaprojectsdrug", "drugMeshTerm", "moa", "therapeuticclass", "targetname", "origin", "entrezgeneid"];
const TRIAL_SEARCH_PARAMETERS = [
  "id",
  "diseasehierarchy",
  "phase",
  "status",
  "sponsorname",
  "sponsortype",
  "trialstartdate",
  "protocolid",
  "source",
  "country",
  "region",
  "trialMeshTerm",
  "trialTag",
  "moa",
  "drugName",
  "drugid",
  "trialPrimaryCompletionDate",
  "trialCtgovMeshterms",
];

const DRUG_PROGRAM_SEARCH_PARAMETERS = [];
const DRUG_COMPANY_SEARCH_PARAMETERS = [];
const DRUG_TRENDS_SEARCH_PARAMETERS = [];
const ORGANIZATION_HIERARCHY_SEARCH_PARAMETERS = [];
const ORGANIZATION_SEARCH_PARAMETERS = ["id", "organizationtype", "country", "name", "diseaseHierarchy", "lasttrialstartdate", "state", "city"];
const INVESTIGATOR_SEARCH_PARAMETERS = ["id", "trialstartdate", "country", "specialty", "sponsors", "diseasetier", "name", "diseaseHierarchy", "state", "city"];

module.exports = {
  DRUG_SEARCH_PARAMETERS,
  TRIAL_SEARCH_PARAMETERS,
  DRUG_PROGRAM_SEARCH_PARAMETERS,
  DRUG_COMPANY_SEARCH_PARAMETERS,
  DRUG_TRENDS_SEARCH_PARAMETERS,
  ORGANIZATION_HIERARCHY_SEARCH_PARAMETERS,
  ORGANIZATION_SEARCH_PARAMETERS,
  INVESTIGATOR_SEARCH_PARAMETERS,
};
