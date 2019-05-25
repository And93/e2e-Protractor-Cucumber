@suite
Feature: API Page

  Scenario: Check visibility API filter
    Given the api page is opened
    Then the api filter should be visible

  Scenario Outline: Filling filter and check results <TypeData> - <StatusData>
    Given the api page is opened
    When I fill type field with data: <TypeData>
    And I fill status field with data: <StatusData>
    Then I get <Results> results`

    Examples:
      | TypeData   | StatusData | Results |
      | Class      | SecureRisk | 2       |
      | @Decorator | Stable     | 19      |
      | Enum       | All        | 20      |
