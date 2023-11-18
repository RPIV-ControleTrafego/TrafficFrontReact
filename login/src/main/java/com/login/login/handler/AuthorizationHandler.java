package com.login.login.handler;

import java.util.Map;
import com.login.login.repository.UserRepository;
import com.login.login.model.User;

public class AuthorizationHandler implements Handler {
    private Handler nextHandler;
    private UserRepository userRepository; 
    
    public AuthorizationHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }

    @Override
    public void handle(Map<String, String> request) {
        String username = request.get("username");
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
        User user = userRepository.findUserByUsername(username);

        if (user != null) {
            return user.getRole();
        }
        return null; 
    }
}
