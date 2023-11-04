package com.login.login.controller;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;

import org.springframework.http.MediaType;




import com.login.login.model.User;
import com.login.login.service.UserService;
import jakarta.servlet.http.HttpServletRequest;


@Controller
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")


class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

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

    @PostMapping("/register")
public ResponseEntity<String> register(@RequestBody Map<String, String> requestBody) {
    String username = requestBody.get("username");
    String password = requestBody.get("password");
  

    // Verifique se o usuário já existe
    if (userService.userExists(username)) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já existe");
    }
    String role = "user"; 
    // Crie o novo usuário
    User newUser = userService.register(username, password, role); 

    if (newUser != null) {
        return ResponseEntity.ok("Usuário registrado com sucesso");
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao registrar usuário");
    }
}
    
    @GetMapping("/getUsers")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
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
    
    @PutMapping("/changeRole/{username}")
    public ResponseEntity<String> changeRole(@PathVariable String username, @RequestBody Map<String, String> requestBody) {
        String role = requestBody.get("role");
        
        if (role != null && userService.changeRole(username, role)) {
            return ResponseEntity.ok("Role changed");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role change failed");
        }
    }
 
    @DeleteMapping("/deleteUser/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        if (userService.deleteUser(username)) {
            log.info("Usuário deletado: " + username);
            return ResponseEntity.ok("User deleted");
        } else {
            log.info("Usuário não deletado: " + username);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User deletion failed");
        }
    }


@GetMapping("/profile")
public ResponseEntity<User> getProfile(HttpServletRequest request) {
    jakarta.servlet.http.HttpSession session = request.getSession();
    User loggedInUser = (User) session.getAttribute("loggedInUser");

    if (loggedInUser != null) {
        return ResponseEntity.ok(loggedInUser);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }
}


private ResponseEntity<?> makeHttpRequest(String url, HttpMethod method, Object body, MultiValueMap<String, String> queryParams) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    if (body != null) {
        HttpEntity<Object> requestEntity = new HttpEntity<>(body, headers);
        return restTemplate.exchange(url, method, requestEntity, Object.class);
    } else {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);

        if (queryParams != null) {
            builder.queryParams(queryParams);
        }

        url = builder.toUriString();
        return restTemplate.exchange(url, method, new HttpEntity<>(headers), Object.class);
    }
}

@GetMapping("/search-fines")
public ResponseEntity<?> searchFines(@RequestParam("query") String query) {
    String url = "http://localhost:8086/infraction/search-fines";
    MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
    queryParams.add("query", query);

    return makeHttpRequest(url, HttpMethod.GET, null, queryParams);
}

@GetMapping("/calculate-fines")
public ResponseEntity<?> calculateFines(@RequestParam("query") String query) {
    String url = "http://localhost:8086/infraction/calculate-fines";
    MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
    queryParams.add("query", query);

    return makeHttpRequest(url, HttpMethod.GET, null, queryParams);
}
}