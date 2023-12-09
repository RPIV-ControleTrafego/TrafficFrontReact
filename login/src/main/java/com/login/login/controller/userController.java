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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.HttpHeaders;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.MediaType;




import com.login.login.model.User;
import com.login.login.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")



class UserController {

    private final Logger log = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticate user and return user role")
@ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful login"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
})
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




       @GetMapping("/logout")
public ResponseEntity<String> logout(HttpServletRequest request) {
    try {
        jakarta.servlet.http.HttpSession session = request.getSession();
        String username = null;

        // Verifica se há um usuário logado na sessão
        if (session.getAttribute("loggedInUser") != null) {
            User loggedInUser = (User) session.getAttribute("loggedInUser");
            username = loggedInUser.getUsername();
            log.info("Usuário desconectado: " + username);
        }

        // Define username como uma string vazia
        username = "";

        // Invalida a sessão
        session.invalidate();


        return ResponseEntity.ok("Logout realizado com sucesso para o usuário: " + username);
    } catch (Exception e) {
        log.error("Erro durante o logout", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro durante o logout");
    }
}



    @PostMapping("/register")
    @Operation(summary = "User Registration", description = "Register new user")
    public ResponseEntity<String> register(@RequestBody Map<String, String> requestBody) {
    String username = requestBody.get("username");
    String password = requestBody.get("password");
    String email = requestBody.get("email");
    String cpf = requestBody.get("cpf");
    // Verifique se o usuário já existe
    if (userService.userExists(username)) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já existe");
    }

    if(username == null || password == null || email == null || cpf == null){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Campos não podem ser nulos");
    }


    // Crie o novo usuário
    User newUser = userService.register(username, password,email, cpf);

    if (newUser != null) {
        return ResponseEntity.ok("Usuário registrado com sucesso");
    } else {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Falha ao registrar usuário");
    }
}

    @GetMapping("/getUsers")
    @Operation(summary = "Get users", description = "Get all users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getRole/{username}")
    @Operation(summary = "Get role", description = "Get role of user by username")
    public ResponseEntity<String> getRole(@PathVariable String username) {
        try {
            User role = userService.getRole(username);
            if (role != null) {
                log.info("getrole method");
                log.info("Username: " + username);
                return ResponseEntity.ok("Role: " + role.getRole());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @PutMapping("/changeRole/{username}")
    @Operation(summary = "Change role", description = "Change role of user by username")
    public ResponseEntity<String> changeRole(@PathVariable String username, @RequestBody Map<String, String> requestBody) {
        String role = requestBody.get("role");

        if (role != null && userService.changeRole(username, role)) {
            return ResponseEntity.ok("Role changed");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role change failed");
        }
    }

    @DeleteMapping("/deleteUser/{username}")
    @Operation(summary = "Delete user", description = "Delete user by username")
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
@Operation(summary = "Get profile", description = "Get profile of logged in user")
public ResponseEntity<User> getProfile(HttpServletRequest request) {
    jakarta.servlet.http.HttpSession session = request.getSession();
    User loggedInUser = (User) session.getAttribute("loggedInUser");

    if (loggedInUser != null) {
        log.info("Profile accessed for user: " + loggedInUser.getUsername()); // Adicione esta linha
        return ResponseEntity.ok(loggedInUser);
    } else {
        log.warn("Unauthorized access to profile"); // Adicione esta linha
        log.info("Profile accessed for user: " + loggedInUser.getUsername()); //
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
@GetMapping("/total-fine-price/{currency}/{cpf}")
@Operation(summary = "Calculate fines", description = "Calculate fines for a given query")
public ResponseEntity<String> calculateFines(
        @PathVariable("currency") String currency,
        @PathVariable("cpf") String cpf) {

    // Construir a URL sem o parâmetro de consulta
    String url = String.format("http://localhost:8086/infraction/total-fine-price/%s/%s", currency, cpf);

    ResponseEntity<String> responseEntity = makeHttpRequest(url, HttpMethod.GET, null, String.class);

    // Verificar se a solicitação foi bem-sucedida
    if (responseEntity.getStatusCode().is2xxSuccessful()) {
        // A resposta já é uma string, não há necessidade de conversão
        return ResponseEntity.ok(responseEntity.getBody());
    } else {
        // Se não foi bem-sucedida, encaminhar o status e a mensagem de erro
        return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
    }
}

// Método makeHttpRequest com tipo de resposta genérico
private <T> ResponseEntity<T> makeHttpRequest(String url, HttpMethod method, HttpEntity<?> requestEntity, Class<T> responseType) {
    RestTemplate restTemplate = new RestTemplate();
    return restTemplate.exchange(url, method, requestEntity, responseType);
}

@GetMapping("/findUser")
@Operation(summary = "Find user", description = "Find user by username")
public ResponseEntity<?> findUser(@RequestParam("username") String username) {
    try {
        User user = userService.findUser(username);
        if (user != null) {
            log.info("User found: " + username);
            return ResponseEntity.ok(user);
        } else {
            log.info("User not found: " + username);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    } catch (Exception e) {
        log.error("Error occurred: " + username, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
    }
}



// @GetMapping("/total-fine-price/{currency}/{cpf}")
// @Operation(summary = "Calculate fines", description = "Calculate fines for a given query")
// public ResponseEntity<String> calculateFines(
//         @PathVariable("currency") String currency,
//         @PathVariable("cpf") String cpf) {

//     // Construir a URL sem o parâmetro de consulta
//     String url = String.format("http://localhost:8086/infraction/total-fine-price/%s/%s", currency, cpf);

//     ResponseEntity<String> responseEntity = makeHttpRequest(url, HttpMethod.GET, null, String.class);

//     // Verificar se a solicitação foi bem-sucedida
//     if (responseEntity.getStatusCode().is2xxSuccessful()) {
//         // A resposta já é uma string, não há necessidade de conversão
//         return ResponseEntity.ok(responseEntity.getBody());
//     } else {
//         // Se não foi bem-sucedida, encaminhar o status e a mensagem de erro
//         return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
//     }
// }

@GetMapping("/NotPaid/{cpf}")
@Operation(summary = "Payment", description = "Payment of fines")
public ResponseEntity<String> payment(@PathVariable("cpf") String cpf) {

    try{
       String url = String.format("/list-non-paid/%s", cpf);
         ResponseEntity<String> responseEntity = makeHttpRequest(url, HttpMethod.GET, null, String.class);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            // A resposta já é uma string, não há necessidade de conversão
            return ResponseEntity.ok(responseEntity.getBody());

        } else {
            // Se não foi bem-sucedida, encaminhar o status e a mensagem de erro
            return ResponseEntity.status(responseEntity.getStatusCode()).body(responseEntity.getBody());
        }



    }catch(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred in finding not paid fines");
    }



}


@GetMapping("/receiveEmail/{cpf}")
@Operation(summary = "Receive email", description = "Receive email of fines")
public ResponseEntity<Boolean> receiveEmail(@PathVariable("cpf") String cpf) {


    try{
        if(userService.receiveEmailIsTrue(cpf)){
            return ResponseEntity.ok(true);
        }
        else{
            return ResponseEntity.ok(false);
        }
    }catch(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);

    }

}

}



