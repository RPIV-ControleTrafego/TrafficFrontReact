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

    public boolean isValidUser(String username, String password) {
        User user = userRepository.findUserByUsername(username);

        if (user != null) {
            return user.getPassword().equals(password);
        }

        return false;
    }
}

