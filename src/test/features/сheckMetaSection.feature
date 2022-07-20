@automated
Feature: JSON schema for meta section

  Scenario Outline: Send a request to [<entity>] and check that status code and json schema for meta section
    When Send request to '<entity>' entity common feed endpoint
    Then The API status code should be 200 - OK
    And Check that the META section in the response has the correct json schema

    Examples:
      | entity                |
      | drug                  |
      | trial                 |
      | investigator          |
      | organization          |
      | drugCompany           |
      | drugProgram           |
      | drugTrends            |
      | organizationHierarchy |