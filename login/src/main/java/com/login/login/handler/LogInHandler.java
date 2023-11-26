package com.login.login.handler;

public abstract class LogInHandler {
    private LogInHandler successor;

    public LogInHandler(LogInHandler successor) {
        this.successor = successor;
    }

    public void setSuccessor(LogInHandler successor) {
        this.successor = successor;
    }

    public boolean handleLogin(String username, String password) {
        if (username == null || password == null) {
            throw new IllegalArgumentException("Nome de usuário e senha não podem ser nulos.");
        }

        if (authenticate(username, password)) {
            printSuccessfulLogin(username);
            return true;
        } else if (successor != null) {
            printFailedAttempt(username);
            return successor.handleLogin(username, password);
        } else {
            userNotFound(username);
            return false;
        }
    }

    protected abstract boolean authenticate(String username, String password);

    private void printSuccessfulLogin(String username) {
        System.out.println("Login bem-sucedido para o usuário: " + username);
    }

    private void printFailedAttempt(String username) {
        System.out.println("Tentativa de login falhou para o usuário: " + username);
    }

    private void userNotFound(String username) {
        System.out.println("Usuário " + username + " não encontrado.");
    }
}
