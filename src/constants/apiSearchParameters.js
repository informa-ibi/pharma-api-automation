const SEARCH_PARAMETERS = {
  drug: [
    { globalStatus: ["Launched", "Discontinued"] },
    { originatorName: ["Lundbeck", "Celgene", "AstraZeneca", "Urigen", "Bayer", "Grifols"] },
    { originatorCountry: ["France", "United States", "Poland", "Belgium", "Israel", "Italy", "Portugal", "Spain"] },
  ],
  trial: [
    { trialPhase: ["I", "II", "III", "I/II"] },
    { trialCountries: ["France", "United States", "Poland", "Belgium", "Israel", "Italy", "Portugal", "Spain", "Ireland", "Germany", "Netherlands"] },
    { trialStatus: ["Terminated", "Completed", "Closed"] },
  ],
  investigator: [
    { investigatorSpecialties: ["Hematology", "Internal Medicine", "Oncology", "Radiology"] },
    { investigatorFirstName: ["Aldo", "Marco", "Robert", "Michael", "Joseph"] },
    { investigatorDegrees: ["FACR", "PHD", "MS", "MD"] },
  ],
  organization: [
    { organizationCountryName: ["France", "United States", "Poland", "Belgium", "Israel", "Italy", "Portugal", "Spain"] },
    { diseaseHierarchy: ["Cardiovascular", "Oncology", "CNS", "Genitourinary", "Ophthalmology"] },
    { organizationTotalTrials: [8, 10, 6, 4] },
  ],
  drugCompany: [],
  drugProgram: [],
  drugTrends: [],
  organizationHierarchy: [],
};

module.exports = {
  SEARCH_PARAMETERS,
};
