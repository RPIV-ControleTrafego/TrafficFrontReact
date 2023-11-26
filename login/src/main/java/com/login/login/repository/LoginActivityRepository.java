package com.login.login.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document
public class LoginActivityRepository {

    @Id
    private String id;
    private String username;
    private LocalDateTime loginTime;

    public LoginActivityRepository() {
    }

    public LoginActivityRepository(String username, LocalDateTime loginTime) {
        this.username = username;
        this.loginTime = loginTime;
    }

    // getters e setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(LocalDateTime loginTime) {
        this.loginTime = loginTime;
    }
}
