@automated
Feature: Response body should be in xml format

  Scenario Outline: Send a request to [<entity>] and check the status code and response body should be in xml format
    When Send request with 'accept xml header' to '<entity>' entity common feed endpoint
    Then The API status code should be 200 - OK
    And Check that the response body is returned in XML format

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