package com.login.login;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.login.login.handler.ChainConfig;

@SpringBootApplication
public class LoginApplication {
    public static void main(String[] args) {
        ChainConfig.configureChain(); 
        SpringApplication.run(LoginApplication.class, args);
    }
}
