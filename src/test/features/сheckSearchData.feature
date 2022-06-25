@automated
Feature: Post request with search  it the body

  Scenario Outline: Send a request to trial and check that status code and check that the search results are correct
    When Send a POST request to trial entity with '<conditional>' search body
    Then The API status code should be 200 - OK
    And Check that the number of elements in the search result is greater than zero
    And Check the result for '<conditional>' simple search body in the response body

    Examples:
      | conditional          |
      | Is                   |
      | IsNot                |
      | IsOnly               |
      | GreaterThan          |
      | GreaterThanOrEqualTo |
      | LessThan             |
      | LessThanOrEqualTo    |
      | Between              |
      | Contains             |
      | NotContains          |

  Scenario Outline: Send a request to drug and check that status code and check that the search results are correct
    When Send a POST request to drug entity with '<conditional>' search body
    Then The API status code should be 200 - OK
    And Check that the number of elements in the search result is greater than zero
    And Check the result for '<conditional>' simple search body in the response body

    Examples:
      | conditional          |
      | Is                   |
      | IsNot                |
      | IsOnly               |
      | GreaterThan          |
      | GreaterThanOrEqualTo |
      | LessThan             |
      | LessThanOrEqualTo    |
      | Between              |
      | Contains             |
      | NotContains          |

  Scenario Outline: Send a request to organization and check that status code and check that the search results are correct
    When Send a POST request to organization entity with '<conditional>' search body
    Then The API status code should be 200 - OK
    And Check that the number of elements in the search result is greater than zero
    And Check the result for '<conditional>' simple search body in the response body

    Examples:
      | conditional          |
      | Is                   |
      | IsNot                |
      | IsOnly               |
      | GreaterThan          |
      | GreaterThanOrEqualTo |
      | LessThan             |
      | LessThanOrEqualTo    |
      | Between              |
      | Contains             |
      | NotContains          |

