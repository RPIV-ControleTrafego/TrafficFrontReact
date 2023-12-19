package com.login.login.handler;

import java.util.Map;
import com.login.login.repository.UserRepository;
import com.login.login.model.User;

public class AuthenticationHandler implements Handler {

    private Handler nextHandler;
    private UserRepository userRepository;

    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void handle(Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (isValidUser(username, password)) {
            System.out.println("Autenticação bem-sucedida para o usuário: " + username);
        } else {
            System.out.println("Falha na autenticação para o usuário: " + username);
        }
        if (nextHandler != null) {
            nextHandler.handle(request);
        }
    }

    private boolean isValidUser(String username, String password) {
        if (userRepository != null) {
            User user = userRepository.findUserByUsername(username);

            return user != null && user.getPassword().equals(password);
        }

        return false;
    }
}
