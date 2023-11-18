package com.login.login.handler;

public class ChainConfig {
    public static void configureChain() {

        
        AuthenticationHandler authenticationHandler = new AuthenticationHandler();
        AuthorizationHandler authorizationHandler = new AuthorizationHandler(userRepository);
        authenticationHandler.setNext(authorizationHandler);
    }
}

