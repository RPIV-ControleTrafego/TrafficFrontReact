package com.login.login.handler;

import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ErrorHandler implements Handler {
    private static final Logger LOGGER = Logger.getLogger(ErrorHandler.class.getName());
    private Handler nextHandler;

    public void setNext(Handler handler) {
        this.nextHandler = handler;
    }

    @Override
    public void handle(Map<String, String> request) {
        LOGGER.log(Level.INFO, "Erro: Nenhum manipulador anterior pôde corrigir a solicitação.");

        if (nextHandler != null) {
            nextHandler.handle(request);
        } else {
            LOGGER.log(Level.SEVERE, "Erro não tratado: A solicitação não pôde ser processada.");
        }
    }
}
