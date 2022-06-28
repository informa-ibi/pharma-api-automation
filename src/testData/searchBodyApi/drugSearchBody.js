const searchBody = {
  Is: {
    Is: {
      value: "NonClinicalTrials.gov",
      name: "drugSource",
    },
  },
  IsNot: {
    IsNot: {
      value: "No Development Reported",
      name: "originatorStatus",
    },
  },
  /*IsOnly: { - does not work!
      IsOnly: {
        value: "HANP",
        name: "drugNameSynonyms",
      },
    },*/
  IsOnly: {
    IsOnly: {
      value:"Injectable",
      name:"deliveryRoutes"
    },
  },
  GreaterThan: {
    gt: {
      value: 185,
      name: "drugId",
    },
  },
  GreaterThanOrEqualTo: {
    gte: {
      value: 628.557,
      name: "molecularWeight",
    },
  },
  LessThan: {
    lt: {
      value: 107,
      name: "drugId",
    },
  },
  LessThanOrEqualTo: {
    lte: {
      value: 85,
      name: "drugId",
    },
  },
  Between: {
    between: {
      from: 200,
      to: 400,
      name: "molecularWeight",
    },
  },
  Contains: {
    contains: {
      value: "overexpressing*",
      name: "preClinical",
    },
  },
  NotContains: {
    notcontains: {
      value: "Hortobagyi*",
      name: "overview",
    },
  },
};
  
module.exports = {
  searchBody,
};
  