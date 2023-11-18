package com.login.login.handler;

public abstract class LogInHandler {
    private LogInHandler successor;

    public void setSuccessor(LogInHandler successor) {
        this.successor = successor;
    }

    public boolean handleLogin(String username, String password) {
        // Lógica de autenticação de exemplo
        if (authenticate(username, password)) {
            System.out.println("Login bem-sucedido para o usuário: " + username);
            return true;
        } else if (successor != null) {
            System.out.println("Tentativa de login falhou para o usuário: " + username);
            return successor.handleLogin(username, password);
        } else {
            System.out.println("Usuário " + username + " não encontrado.");
            return false;
        }
    }

    protected abstract boolean authenticate(String username, String password);
}
