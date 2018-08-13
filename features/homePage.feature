Feature: Home Page 

    Scenario: Check visibility 'get started' button
        Given the home page is opened
        Then the 'get started' button should be visible

    Scenario Outline: Check clickability 'get started' button at the <Position>
        Given the home page is opened
        When click the button at the <Position> of the page
        Then the QuickStart page is opened (assert)

    Examples:
        | Position  |
        |   top     |
        |   bottom  |

    Scenario Outline: Check visibility and name of block <Index>
        Given the home page is opened
        When scroll to <Index> block
        Then the block <Index> should be visible    
        Then the name of <Index> block should be '<Name>'

    Examples:
        | Index | Name                          |
        |   1   | DEVELOP ACROSS ALL PLATFORMS  |
        |   2   | SPEED & PERFORMANCE           |
        |   3   | INCREDIBLE TOOLING            |
        |   4   | LOVED BY MILLIONS             |
        |   5   | GET STARTED                   |