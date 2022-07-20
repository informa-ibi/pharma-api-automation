@automated
Feature: Check search/{entity}/listlist endpoint

    Scenario Outline: Send a request to [<entity>] and check that status code and list endpoint has correct JSON schema and items data
        When Send request to '<entity>' entity list endpoint
        Then The API status code should be 200 - OK
        And Check the response schema for the '<entity>' entity for the _list endpoint
        And Check that the items elements in the response are correct for the '<entity>' entity

        Examples:
            | entity       |
            | drug         |
            | trial        |
            | investigator |
            | organization |