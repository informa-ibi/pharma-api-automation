@automated
Feature: Search endpoint with sort and order query

    Scenario Outline: Send a request to ['<entity>'] and make sure that the items in the response are sorted and displayed in the default order
        When Send a request to '<entity>' entity endpoint with random search parameter and with random sort parameter without order query
        Then The API status code should be 200 - OK
        And Check that the number of elements in the response is greater than zero for '<entity>'
        And Check that the total record count of elements in the response result is greater than zero for '<entity>'
        And Check that the response elements are sorted by the random parameter and term for the '<entity>' entity
        And Check that the data is sorted correctly without specified order
        Examples:
            | entity       |
            | drug         |
            | trial        |
            | investigator |
            | organization |

    Scenario Outline: Send a request to ['<entity>'] and make sure that the items in the response are sorted and displayed in the ['<order>'] order
        When Send a request to '<entity>' entity endpoint with random search parameter and with random sort parameter with '<order>' order query
        Then The API status code should be 200 - OK
        And Check that the number of elements in the response is greater than zero for '<entity>'
        And Check that the total record count of elements in the response result is greater than zero for '<entity>'
        And Check that the response elements are sorted by the random parameter and term for the '<entity>' entity
        And Check that the data is sorted correctly and that it is displayed in the correct order - '<order>'
        Examples:
            | entity       | order |
            | drug         | Asc   |
            | trial        | Desc  |
            | investigator | Desc  |
            | organization | Asc   |

