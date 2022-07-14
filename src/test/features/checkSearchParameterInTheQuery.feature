@automated
Feature: Search endpoint with parameter and term in the query

    Scenario Outline: Send a request to ['<entity>'] and make sure that the items in the response are sorted and displayed in the default order
        When Send a request to '<entity>' entity search endpoint with random search parameter and term
        Then The API status code should be 200 - OK
        And Check that the number of elements in the response is greater than zero for '<entity>'
        And Check that the total record count of elements in the response result is greater than zero for '<entity>'
        And Check that the elements in the response match the search conditions by the random parameter and term for the '<entity>' entity
        And Check that the data is sorted correctly without specified order
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
