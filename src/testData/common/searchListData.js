const searchListItemsData = {
  drug: [
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/drugname",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?drugname=",
      name: "drugname",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/drugmeshterm",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?drugmeshterm=",
      name: "drugmeshterm",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/companyname",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?companyname=",
      name: "companyname",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/entrezgeneid",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?entrezgeneid=",
      name: "entrezgeneid",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/globalstatus",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?globalstatus=",
      name: "globalstatus",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/indicationgroup",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?indicationgroup=",
      name: "indicationgroup",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/moa",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?moa=",
      name: "moa",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/origin",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?origin=",
      name: "origin",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/targetname",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?targetname=",
      name: "targetname",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/drug/list/therapeuticclass",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/drug?therapeuticclass=",
      name: "therapeuticclass",
    },
  ],
  trial: [
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/country",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?country=",
      name: "country",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/diseasehierarchy",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?diseasehierarchy=",
      name: "diseasehierarchy",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/drugid",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?drugid=",
      name: "drugid",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/drugname",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?drugname=",
      name: "drugname",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/moa",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?moa=",
      name: "moa",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/phase",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?phase=",
      name: "phase",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/protocolid",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?protocolid=",
      name: "protocolid",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/region",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?region=",
      name: "region",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/sponsorname",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?sponsorname=",
      name: "sponsorname",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/sponsortype",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?sponsortype=",
      name: "sponsortype",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/status",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?status=",
      name: "status",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/trialctgovmeshterms",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?trialctgovmeshterms=",
      name: "trialctgovmeshterms",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/trialmeshterm",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?trialmeshterm=",
      name: "trialmeshterm",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/trial/list/trialtag",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/trial?trialtag=",
      name: "trialtag",
    },
  ],
  investigator: [
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/city",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?city=",
      name: "city",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/country",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?country=",
      name: "country",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/diseasehierarchy",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?diseasehierarchy=",
      name: "diseasehierarchy",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/diseasetier",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?diseasetier=",
      name: "diseasetier",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/name",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?name=",
      name: "name",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/specialty",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?specialty=",
      name: "specialty",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/sponsors",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?sponsors=",
      name: "sponsors",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator/list/state",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/investigator?state=",
      name: "state",
    },
  ],
  organization: [
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/city",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?city=",
      name: "city",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/country",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?country=",
      name: "country",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/diseasehierarchy",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?diseasehierarchy=",
      name: "diseasehierarchy",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/name",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?name=",
      name: "name",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/organizationregions",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?organizationregions=",
      name: "organizationregions",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/organizationtype",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?organizationtype=",
      name: "organizationtype",
    },
    {
      listURL: "https://api.pharmaintelligence.informa.com/v1/search/organization/list/state",
      searchURL: "https://api.pharmaintelligence.informa.com/v1/search/organization?state=",
      name: "state",
    },
  ],

  /*/list endpoint is not available for these entities. Waiting for validation
  drugCompany: [],
  drugProgram: [],
  drugTrends: [],
  organizationHierarchy: [],*/
};

module.exports = { searchListItemsData };
