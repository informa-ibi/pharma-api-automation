@automated
Feature: Feed endpoint with parameters in query

  Scenario Outline: Send a request to ['<entity>'] and make sure that the status code is correct and all the fields specified in the request are in the response body
    When Send a request to '<entity>' entity specifying '<count>' random fields in the query
    Then The API status code should be 200 - OK
    And Check that the fields specified in the query are present in the body of the response

    Examples:
      | entity                | count |
      | drug                  | 5     |
      | trial                 | 7     |
      | investigator          | 5     |
      | organization          | 5     |
      | drugCompany           | 4     |
      | drugProgram           | 4     |
      | drugTrends            | 3     |
      | organizationHierarchy | 3     |