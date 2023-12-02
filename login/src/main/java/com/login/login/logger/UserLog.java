package com.login.login.logger;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class UserLog {

   
    private Logger logger;

     public UserLog(Class<?> clazz) {
        this.logger = LoggerFactory.getLogger(clazz);
    }

  
    public void info(String message) {
        logger.info(message); 
    }

    public void error(String message) {
        logger.error(message);
    }

    public void error(String message, Exception exception) {
        logger.error(message, exception); 
    }

    public void error(String message, String exceptionMessage) {
      
        logger.error(message + ": " + exceptionMessage);
    }


    public void info(String string, String date) {
        logger.info(string, date);
    }

    public void info(String string, int speed) {
        logger.info(string, speed);
    }


    public void info(String string, String cpf, Double totalFinePrice) {
    }


    public void info(String string, double finePrice, String violation) {
    }

   
    public void warn(String string ){
        logger.warn(string);

    }
    
}



