package com.login.login.handler;

public class ChainConfig {
    public static void configureChain() {
        Handler authenticationHandler = new AuthenticationHandler();
        Handler authorizationHandler = new AuthorizationHandler();

        authenticationHandler.setNext(authorizationHandler);
    }
}

