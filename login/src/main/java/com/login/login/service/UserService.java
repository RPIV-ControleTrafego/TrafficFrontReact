package com.login.login.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import com.login.login.model.User;
import com.login.login.repository.UserRepository;
import com.mongodb.client.result.UpdateResult;
import javax.servlet.http.HttpSession;

@Service

public class UserService {

    @Autowired
    private UserRepository userRepository;
    public User login(String username, String password) {
        try {
            User user = userRepository.findUserByUsername(username);
    
            if (user != null && user.getPassword().equals(password)) {
                
                return user;

            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
    // Método para verificar se um usuário está autenticado
    public boolean isAuthenticated(HttpSession session) {
        return session.getAttribute("user") != null;
    }

   
    public void logout(HttpSession session) {
        session.removeAttribute("user");
        session.invalidate(); 
    }

    public User register(String username, String password, String email, String cpf) {
        try {
           
            if (userRepository.findUserByUsername(username) != null) {
                return null; // Usuário já existe, retorna null
            }
            String role = "user";
            
          
            User user = new User(username, password, email, role, cpf);
            userRepository.save(user);
    
            return user; 
        } catch (Exception e) {
            return null; 
        }
    }

    public boolean logout() {
        // Implemente a lógica de logout, se necessário
        return true;
    }

    public boolean changePassword(String username, String password) {
        try {
            User user = userRepository.findUserByUsername(username);
            user.setPassword(password);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean changeEmail(String name, String email) {
        try {
            User user = userRepository.findUserByUsername(name);
            user.setEmail(email);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

   @Autowired
private MongoTemplate mongoTemplate;

public boolean changeRole(String name, String role) {
    try {
        Query query = new Query(Criteria.where("username").is(name));
        Update update = new Update().set("role", role);
        UpdateResult result = mongoTemplate.updateFirst(query, update, User.class);

        return result.wasAcknowledged(); // Retorna true se a atualização foi bem-sucedida
    } catch (Exception e) {
        return false;
    }
}
    public boolean deleteUser(String username) {
        try {
            userRepository.deleteUserByUsername(username);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteAllUsers() {
        try {
            userRepository.deleteAll();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByName(String name) {
        return userRepository.findUserByUsername(name);
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public User getRole(String username) {
        try {
            User user = userRepository.findUserByUsername(username);
            if (user != null) {
                System.err.println(user.getRole());
                return user;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }


    public boolean userExists(String username) {
        return userRepository.findUserByUsername(username) != null;
    }

    public User findUser(String username) {
        try {
            return userRepository.findUserByUsername(username);
        } catch (Exception e) {
          
            return null; 
        }
    }



    
}