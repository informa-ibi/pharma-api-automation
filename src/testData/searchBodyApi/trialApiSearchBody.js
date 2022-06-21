const searchBody = {
  Is: {
    is: {
      value: "II",
      name: "trialPhase",
    },
  },
  IsNot: {
    IsNot: {
      value: "II",
      name: "trialPhase",
    },
  },
  /*IsOnly:        {
        "IsOnly": {
            "value": "II",
            "name": "trialPhase"
        }
    },*/
    GreaterThan: {
    gt: {
      value: 159688,
      name: "trialId",
    },
  },
  GreaterThanOrEqualTo: {
    gte: {
      value: 27,
      name: "trialId",
    },
  },
  LessThan: {
    lt: {
      value: 27,
      name: "trialId",
    },
  },
  LessThanOrEqualTo: {
    lt: {
      value: 27,
      name: "trialId",
    },
  },
  Between: {
    between: {
      from: 5,
      to: 10,
      name: "trialId",
    },
  },
  Contains: {
    contains: {
      value: "A Multicenter*",
      name: "trialtitle",
    },
  },
  NotContains: {
    notcontains: {
      value: "To compare the overall survival*",
      name: "trialObjective",
    },
  },
};

module.exports = {
  searchBody,
};
