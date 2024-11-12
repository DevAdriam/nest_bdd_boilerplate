Feature : Suspend a user
    As an admin 
    I want to suspend a user 
    So that the user cannot access the system

    Scenario : Successfully suspending an existing user
        Given there is an existing user with ID "12345"
        When I suspend the user with ID "12345"
        Then the user status should be updated to "SUSPENDED"

    Scenario : Trying to suspend a non-existing user
        Given there is no user with ID "6789"
        When I suspend the user with ID "6789"
        Then I should receive an error message "user not found"