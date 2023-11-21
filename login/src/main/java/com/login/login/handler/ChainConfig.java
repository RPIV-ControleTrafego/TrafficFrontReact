package com.login.login.handler;


import com.login.login.repository.UserRepository;

public class ChainConfig {
    public static void configureChain() {

        UserRepository userRepository = UserRepository.getInstance();
        AuthenticationHandler authenticationHandler = new AuthenticationHandler();
        AuthorizationHandler authorizationHandler = new AuthorizationHandler(userRepository);
        authenticationHandler.setNext(authorizationHandler);
    }
}


