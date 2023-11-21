package com.login.login.handler;

import java.util.Map;
import com.login.login.repository.UserRepository;
import com.login.login.model.User;

public class AuthorizationHandler implements Handler {
    private Handler nextHandler;
    private UserRepository userRepository; 
    
    public AuthorizationHandler(UserRepository userRepository) {
        if (userRepository == null) {
            throw new IllegalArgumentException("UserRepository cannot be null");
        }
        this.userRepository = userRepository;
    }

    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }

    @Override
    public void handle(Map<String, String> request) {
        String username = request.get("username");

        if (username == null || username.isEmpty()) {
            System.out.println("Nome de usuário inválido ou ausente.");
            return;
        }

        String role = getRole(username);

        if (role != null && role.equals("admin")) {
            System.out.println("Usuário autorizado com permissão de administrador: " + username);
        } else {
            System.out.println("Usuário não autorizado para acessar este recurso: " + username);
        }

        if (nextHandler != null) {
            nextHandler.handle(request);
        }
    }

    public String getRole(String username) {
        try {
            User user = userRepository.findUserByUsername(username);

            if (user != null) {
                return user.getRole();
            } else {
                System.out.println("Usuário não encontrado: " + username);
            }
        } catch (Exception e) {
            System.out.println("Ocorreu um erro ao buscar o usuário: " + e.getMessage());
        }
        return null;
    }
}
