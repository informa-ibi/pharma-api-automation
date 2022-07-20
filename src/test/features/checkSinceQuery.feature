@automated
Feature: Feed endpoint with since, count?since, ?since&type query parameters

    Scenario Outline: Send a request to ['<entity>'] and make sure that the status code is correct and all the date of the element is greater than the base value
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

    Scenario Outline: Send a request to ['<entity>'] and make sure that the status code is correct and the number of records is greater than zero
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

    Scenario Outline: Send a request to ['<entity>'] and make sure that the status code is correct and &type query parameters works correctly
        When Send a request to '<entity>' entity to changes endpoint with since and random type query
        Then The API status code should be 200 - OK
        And Check that the date of the all elements is greater than the base value in the request for ?since&type query parameters
        And Check that all the elements in the response of the correct type according to the query with ?since&type request
        And Check that the total record count is greater than zero for ?since&type query parameters

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