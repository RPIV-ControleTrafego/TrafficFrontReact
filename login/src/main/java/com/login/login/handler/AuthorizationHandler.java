package com.login.login.handler;


import java.util.Map;

public class AuthorizationHandler implements Handler {
    private Handler nextHandler;

    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }

    @Override
    public void handle(Map<String, String> request) {
        String username = request.get("username");
        String role = getUserRole(username);

        if (role != null && role.equals("admin")) {
            System.out.println("Usuário autorizado com permissão de administrador: " + username);
        } else {
            System.out.println("Usuário não autorizado para acessar este recurso: " + username);
        }
        if (nextHandler != null) {
            nextHandler.handle(request);
        }
    }

    private String getUserRole(String username) {
        
    }
}

