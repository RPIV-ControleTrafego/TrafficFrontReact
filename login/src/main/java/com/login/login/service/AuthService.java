package com.login.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.login.model.User;
import com.login.login.repository.LoginActivityRepository;
import com.login.login.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoginActivityRepository loginActivityRepository;

    public void logLoginActivity(String username) {
        // Busca o usuário no banco de dados
        User user = userRepository.findByUsername(username);

        if (user != null) {
            // Cria uma instância de LoginActivity
            LoginActivityRepository loginActivity = new LoginActivityRepository(username, LocalDateTime.now());

            // Adiciona a atividade de login à lista de atividades do usuário (opcional)
            user.addLoginActivity(loginActivity);

            // Salva a atividade de login no MongoDB
            loginActivityRepository.save(loginActivity);

            // Atualiza o usuário no banco de dados (opcional)
            userRepository.save(user);
        }
    }
}
