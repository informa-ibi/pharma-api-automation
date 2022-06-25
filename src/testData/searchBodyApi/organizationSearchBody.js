const searchBody = {
  Is: {
    Is: {
      value: "Gesund in Gars",
      name: "organizationName",
    },
  },
  IsNot: {
    IsNot: {
      value: "Academic Hospital / Clinic",
      name: "organizationType",
    },
  },
  IsOnly: {
    IsOnly: {
      value: "Africa",
      name: "organizationRegions",
    },
  },
  GreaterThan: {
    gt: {
      value: 58,
      name: "organizationId",
    },
  },
  GreaterThanOrEqualTo: {
    gte: {
      value: 27,
      name: "organizationId",
    },
  },
  LessThan: {
    /*lt: { - does not work!!
        value: 10,
        name: "organizationTotalTrials",
      },*/
    lt: {
      value: 10,
      name: "organizationId",
    },
  },
  LessThanOrEqualTo: {
    /*lte: {- does not work!!
        value: 2,
        name: "organizationTotalOngoingTrials",
      },*/
    lte: {
      value: 2,
      name: "organizationId",
    },
  },
  Between: {
    between: {
      from: 2,
      to: 15,
      name: "organizationTotalPastTrials",
    },
  },
  Contains: {
    /*contains: {
      //does not work!
      value: "Stadtplatz*",
      name: "organizationLocation.streetAddress",
    },*/
    contains: {
      value: "Hospital*",
      name: "organizationType",
    },
  },
  NotContains: {
    notcontains: {
      value: "Hospital*",
      name: "organizationType",
    },
  },
};

module.exports = {
  searchBody,
};
