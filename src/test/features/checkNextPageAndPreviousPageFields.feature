@notAutomated
Feature: NextPage and PreviousPage fields

    Scenario Outline: Send a request to [<entity>] and check that NextPage and PreviousPage fields are present and work
        When Send request to '<entity>' entity common feed endpoint
        Then The API status code should be 200 - OK
        And There is a nextPage in the API response and response has the correct json schema
        And Move to the nextPage link for the '<entity>' entity
        And The API status code should be 200 - OK
        And Check that the data when going to the nextPage differs from those on the start page for the '<entity>' entity
        And There are a nextPage and a previousPage in the API response and response has the correct json schema

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