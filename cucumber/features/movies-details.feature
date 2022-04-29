Feature: Movie Details Page

  Background: Navigate and search the "Batman Movie"
    Given I am on the home page
    When on the navbar I search "The Batman"
    And In the search page I click on "The Batman" Title

  Scenario: In Batman details I should validate that the Director is Matt Reeves & and than Robert Pattison is 1 of the actors
    Then I should read that the Director is "Matt Reeves" & and than "Robert Pattinson" is 1 of the actors