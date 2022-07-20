@automated
Feature: Page size of an API response

  Scenario Outline: Send a request to [<entity>] and check that status code and check that the number of elements is default value
    When Send request to '<entity>' entity common feed endpoint with default setting for the page size
    Then The API status code should be 200 - OK
    And Expected that the number of elements will be equal to the standard value

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

  Scenario Outline: Send a request to [<entity>] and check that status code and page size [<pageSize>]
    When Send request to '<entity>' entity common feed endpoint with page size equal to '<pageSize>'
    Then The API status code should be 200 - OK
    And Expected that the number of elements to be equal to the expected value of '<pageSize>' elements

    Examples:
      | entity                | pageSize |
      | drug                  | 2499     |
      | trial                 | 2500     |
      | investigator          | 1556     |
      | organization          | 745      |
      | drugCompany           | 1905     |
      | drugProgram           | 801      |
      | drugTrends            | 348      |
      | organizationHierarchy | 1225     |

  Scenario Outline: Send a request to [<entity>] and check that status code and check that the number of elements is not more than the maximum number
    When Send request to '<entity>' entity common feed endpoint with page size equal to '<pageSize>'
    Then The API status code should be 200 - OK
    And Expected that the number of elements will be equal to the max value

    Examples:
      | entity                | pageSize |
      | drug                  | 2501     |
      | trial                 | 7070     |
      | investigator          | 2799     |
      | organization          | 3000     |
      | drugCompany           | 2585     |
      | drugProgram           | 4000     |
      | drugTrends            | 5423     |
      | organizationHierarchy | 4562     |