@automated @PBPA-1746
Feature: NextPage and PreviousPage fields in response body for search and feed endpoint

    # The apiEndpoint can take the values 'feed' and 'search'.
    Scenario Outline: Send a request to [<entity>] entity to [<apiEndpoint>] endpoin and check that nextPage field is present and work
        When Send request to '<entity>' entity common feed endpoint
        Then The API status code should be 200 - OK
        And There is a only nextPage field in the API response for '<apiEndpoint>' endpoint for the '<entity>' entity and response has the correct json schema
        And Move to the nextPage link for the '<apiEndpoint>' endpoint
        And The API status code should be 200 - OK
        And Check that the data when going to the nextPage for '<apiEndpoint>' endpoint differs from those on the start page for the '<entity>' entity
        And There is a only nextPage field in the API response for '<apiEndpoint>' endpoint for the '<entity>' entity and response has the correct json schema

        Examples:
            | entity                | apiEndpoint |
            | drug                  | feed        |
            | trial                 | feed        |
            | investigator          | feed        |
            | organization          | feed        |
            | drugCompany           | feed        |
            | drugProgram           | feed        |
            | drugTrends            | feed        |
            | organizationHierarchy | feed        |

    Scenario Outline: Send a request to [<entity>] entity to [<apiEndpoint>] endpoin and check that nextPage field is present and work
        When Send a request to '<entity>' entity common search endpoint with random search parameter for next page field
        Then The API status code should be 200 - OK
        And There is a only nextPage field in the API response for '<apiEndpoint>' endpoint for the '<entity>' entity and response has the correct json schema
        And Move to the nextPage link for the '<apiEndpoint>' endpoint
        And The API status code should be 200 - OK
        And Check that the data when going to the nextPage for '<apiEndpoint>' endpoint differs from those on the start page for the '<entity>' entity
        And There are a nextPage and a previousPage fields in the API response for '<apiEndpoint>' endpoint for the '<entity>' entity and response has the correct json schema

        Examples:
            | entity       | apiEndpoint |
            | drug         | search      |
            | trial        | search      |
            | investigator | search      |
            | organization | search      |

    Scenario Outline: Send a request to [<entity>] entity to [<apiEndpoint>] endpoin and check that previous field is present and work
        When Send a request to '<entity>' entity common search endpoint with random search parameter for next page field
        Then The API status code should be 200 - OK
        And Move to the nextPage link for the '<apiEndpoint>' endpoint
        And The API status code should be 200 - OK
        And There are a nextPage and a previousPage fields in the API response for '<apiEndpoint>' endpoint for the '<entity>' entity and response has the correct json schema
        And Move to the previousPage link
        And The API status code should be 200 - OK
        And Check that the data when going to the previousPage differs for '<apiEndpoint>' endpoint for the '<entity>' entity from those on the nextPage page
        And Check that the data when going to the previousPage the same for start page for '<apiEndpoint>' endpoint for the '<entity>' entity
        And There is a only nextPage field after previousPage in the API response for '<apiEndpoint>' endpoint for the '<entity>' entity and response has the correct json schema

        Examples:
            | entity       | apiEndpoint |
            | drug         | search      |
            | trial        | search      |
            | investigator | search      |
            | organization | search      |