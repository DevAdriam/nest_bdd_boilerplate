Feature : User Suspension 
    Scenario: Successfully suspend an existing user
    Given a user with ID "123" exists
    When I suspend the user with ID "123"
    Then the user should be marked as suspended 
    
