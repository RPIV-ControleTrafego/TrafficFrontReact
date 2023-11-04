package com.login.login.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    String username;
    String password;
    String email;
    String role;   
    String cpf; 

}
