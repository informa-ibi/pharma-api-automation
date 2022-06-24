@automated2
Feature: Feed changes endpoint with since query

    Scenario Outline: Send a request to ['<entity>'] and make sure that the status code is correct and all the fields specified in the request are in the response body
        When Send a request to '<entity>' entity to changes endpoint with since query
        Then The API status code should be 200 - OK
        And Check that the number of elements in the response result is greater than zero
        And Check that the date of the element is greater than the base value in the request

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

    Scenario Outline: Send2 a request to ['<entity>'] and make sure that the status code is correct and all the fields specified in the request are in the response body
        When Send a request to '<entity>' entity to changes count endpoint with since query
        Then The API status code should be 200 - OK
        And Check that the number of records is greater than zero

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