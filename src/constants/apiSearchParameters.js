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
  drugCompany: [
    { companyCountry: ["France", "United States", "Poland", "Belgium", "Israel", "Italy", "Portugal", "Spain"] },
    { companyName: ["Abbott", "Bioprojet", "Ajinomoto", "Alcide", "Praxis"] },
    { researchFocus: ["Pharmaceutical", "Biotechnology", "Healthcare", "Diagnostic"] },
    { ownershipType: ["Private", "Public"] },
  ],
  drugProgram: [
    { drugPrimaryName: ["RD-102", "AUM-001", "RD-302", "bisantrene", "siplizumab", "osanetant"] },
    { drugNameSynonyms: ["ACER 801", "ACER-801", "ACER801", "osanetant", "SR 142801", "SR 142806", "SR-142801", "SR-142806", "SR142801", "SR142806"] },
    { countryName: ["France", "United States", "Poland", "Belgium", "Israel", "Italy", "Portugal", "Spain"] },
    { indicationGroup: ["Anticancer", "Dermatological", "Anti-infective", "Neurological", "Cardiovascular", "Miscellaneous"] },
    { companyName: ["Geron", "Lacer", "Ipsen", "Medigene", "Qualigen", "Archemix"] },
  ],
  drugTrends: [{ drugPrimaryName: ["carperitide", "SPC-104065", "Ro-48-6791", "levocetirizine", "levalbuterol", "dexibuprofen", "esoxybutynin"] }],
  organizationHierarchy: [{ parentOrganizationId: [89439, 245668, 80089, 414, 276191, 74332] }],
};

module.exports = {
  SEARCH_PARAMETERS,
};
