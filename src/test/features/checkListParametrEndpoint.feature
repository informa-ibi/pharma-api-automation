@automated
Feature: Check search/{entity}/listlist endpoint

  Scenario Outline: Send a request to [<entity>] and check that status code and list/parameter endpoint has correct JSON schema
    When Send request to '<entity>' entity to _list_parameter endpoint for random parameter
    Then The API status code should be 200 - OK
    And Check the response schema for the '<entity>' entity for the _list_parameter endpoint

    Examples:
      | entity       |
      | drug         |
      | trial        |
      | investigator |
      | organization |