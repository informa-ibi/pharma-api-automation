@automated
Feature: The count of items in the API and the Database

  Scenario Outline: Send a request to [<entity>] and check that status code and count of items in the API and the Database
    When Send request to '<entity>' entity count endpoint
    Then The API status code should be 200 - OK
    When Get the number of records for an '<entity>' entity from the PG database
    Then The count of items in the API and database differs by no more than 1 percent for the entity - '<entity>'

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