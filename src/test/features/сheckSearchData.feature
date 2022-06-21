@automated
Feature: Post request search data

  Scenario Outline: Send a request to trial and check that status code and check that the search results are correct
    When Send a POST request to trial entity with '<conditional>' search body
    Then The API status code should be 200 - OK

    Examples:
      | conditional          |
      | Is                   |
      | IsNot                |
      | GreaterThan          |
      | GreaterThanOrEqualTo |
      | LessThan             |
      | LessThanOrEqualTo    |
      | Between              |
      | Contains             |
      | NotContains          |
