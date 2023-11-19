package com.login.login.handler;


import com.login.login.handler.AuthenticationHandler;

public class ChainConfig {
    public static void configureChain() {
        UserRepository userRepository = UserRepository.getInstance(); 
        AuthenticationHandler authenticationHandler = new AuthenticationHandler();
        AuthorizationHandler authorizationHandler = new AuthorizationHandler(userRepository);
        authenticationHandler.setNext(authorizationHandler);
    }
}

class UserRepository {
    private static UserRepository instance;

    private UserRepository() {
        // private constructor to prevent instantiation
    }

    public static UserRepository getInstance() {
        if (instance == null) {
            instance = new UserRepository();
        }
        return instance;
    }

    // other methods and fields...
}

