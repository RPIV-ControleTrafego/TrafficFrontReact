package com.login.login.repository;




import org.springframework.data.mongodb.repository.MongoRepository;


import com.login.login.model.User;




public interface UserRepository  extends MongoRepository<User, String> {

    User findUserByUsername(String username);
    User findUserByEmail(String email);
    boolean deleteUserByUsername(String username);
    boolean deleteUserByEmail(String email);
    

}   
