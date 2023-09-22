package com.ems.Exceptions;

import org.bson.types.ObjectId;

public class DatabaseException extends Exception  {

    public static final String LOCATING_EMPLOYEE = "There was an error locating the employee with ID: ";
    public static  final String LOCATING_MANAGER = "There was an error locating the manager with ID: ";
    public static final String LOCATING_LOCATION = "There was an error locating the location with ID: ";
    public static final String LOCATING_ORGANIZATION = "There was an error locating the organization with ID: ";
    public static final String LOCATING_SHIFT = "There was an error locating the shift with ID: ";

    public static final String SAVING_EMPLOYEE = "there was an error saving the employee with ID: ";
    public static final String SAVING_MANAGER = "there was an error saving the manager with ID: ";
    public static final String SAVING_ORGANIZATION = "there was an error saving the organization with ID: ";
    public static final String SAVING_SHIFT = "there was an error saving the shift with ID: ";

    public static final String DELETING_EMPLOYEE = "There was an error deleting the employee with ID: ";
    public static final String DELETING_MANAGER = "There was an error deleting the manager with ID: ";
    public static final String DELETING_ORGANIZATION = "There was an error deleting the organization with ID: ";
    public static final String DELETING_SHIFT = "There was an error deleting the shift with ID: ";


    public DatabaseException(String message, ObjectId objectId) {
        super(message + objectId.toString());
    }
}
