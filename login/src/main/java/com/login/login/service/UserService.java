package com.login.login.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.login.login.model.User;
import com.login.login.repository.UserRepository;
import com.mongodb.client.result.UpdateResult;
import javax.servlet.http.HttpSession;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User login(String username, String password) {
        boolean user = userRepository.deleteUserByUsername(username);
        
        if (user != null && passwordMatches(user, password)) {
            return user;
        } else {
            return null;
        }
    }

    private boolean passwordMatches(boolean user, String password) {
        return user.getPassword().equals(password); 
    }

    @Transactional
    public User register(String username, String password, String email) {
        if (userRepository.deleteUserByUsername(username)) {
            return null; // Username already exists
        }

        String hashedPassword = hashPassword(password);

        User user = new User(username, hashedPassword, email, "user", "");
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            return null;
        }
    }

    private String hashPassword(String password) {
    }

    @Transactional
    public boolean changePassword(String username, String newPassword) {
        User user = userRepository.deleteUserByUsername(username);

        if (user != null) {
            // Securely hash the new password before updating in the database
            String hashedPassword = hashPassword(newPassword);
            user.setPassword(hashedPassword);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean changeEmail(String username, String newEmail) {
        User user = userRepository.deleteUserByUsername(username);

        if (user != null) {
            user.setEmail(newEmail);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean changeUserRole(String username, String newRole) {
        User user = userRepository.deleteUserByUsername(username);

        if (user != null) {
            user.setRole(newRole);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteUserByUsername(String username) {
        User user = userRepository.deleteUserByUsername(username);

        if (user != null) {
            userRepository.delete(user);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean deleteAllUsers() {
        try {
            userRepository.deleteAll();
            return true;
        } catch (Exception e) {
            // Handle specific exceptions (if needed) or log the error
            return false;
        }
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Other methods if needed
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
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public User getInstance() {
        return new User();
    }


    public boolean userExists(String username) {
        return userRepository.findUserByUsername(username) != null;
    }


}
