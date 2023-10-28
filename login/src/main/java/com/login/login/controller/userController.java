package com.login.login.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.login.login.model.User;
import com.login.login.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/user")
@CrossOrigin(origins = "*")
class UserController {


    private final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @PostMapping("/login")
public ResponseEntity<String> login(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
    String username = requestBody.get("username");
    String password = requestBody.get("password");

    // Obtém o papel do usuário
    String role = userService.getRole(username).getRole();

    // Verifica se o login é bem-sucedido
    User loggedInUser = userService.login(username, password);

    if (loggedInUser != null) {
        jakarta.servlet.http.HttpSession session = request.getSession();
        session.setAttribute("loggedInUser", loggedInUser);
        session.setAttribute("role", role);
        log.info("Novo usuário logado: " + username + " - Role: " + role);
        
        // Retorne o papel do usuário como parte da resposta
        return ResponseEntity.ok(role);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
    }
}
    @GetMapping("/getUsers")
    public String getUsers() {
        return userService.getAllUsers().toString();
    }


    @GetMapping("/getRole/{username}")
    public ResponseEntity<String> getRole(@PathVariable String username) {
        try {
            User role = userService.getRole(username);
            if (role != null) {
                return ResponseEntity.ok("Role: " + role.getRole());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
    


    @PutMapping("/changeRole")
public ResponseEntity<String> changeRole(@RequestBody Map<String, String> requestBody) {
    String name = requestBody.get("username");
    String role = requestBody.get("role");

    if (name != null && role != null && userService.changeRole(name, role)) {
        return ResponseEntity.ok("Role changed");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role change failed");
    }
}
    
    
}