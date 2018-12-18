@suite
Feature: Search Field

  Scenario Outline: Search field is visible on the <Page> page
    Given the <Page> page is opened
    Then the search field is visible

    Examples:
      | Page       |
      | home       |
      | QuickStart |

  Scenario Outline: Filling in the search field <Data>
    Given the home page is opened
    When input <Data> into the search field
    Then list of search results has <Column name>

    Examples:
      | Data     | Column name       |
      | API      | API               |
      | Guide    | GUIDE             |
      | Tutorial | TUTORIAL          |
      | QWE123   | No results found. |

  Scenario Outline: Filling the search field with incorrect data <Data>
    Given the home page is opened
    When input <Data> into the search field
    Then list of search results is empty
    And list of search results has <Column name>

    Examples:
      | Data   | Column name       |
      | QWE123 | No results found. |