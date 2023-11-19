import com.login.login.repository.UserRepository; // Import the UserRepository class
package com.login.login.handler;


public class ChainConfig {
    public static void configureChain() {
        UserRepository userRepository = new UserRepository();
        
        AuthenticationHandler authenticationHandler = new AuthenticationHandler();
        AuthorizationHandler authorizationHandler = new AuthorizationHandler(userRepository);
        authenticationHandler.setNext(authorizationHandler);
    }
}

