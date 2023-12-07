package com.ems.Exceptions;

public class SvcException extends Exception {

    public final String EMPLOYEE_VALIDATION_ERROR = "There was an error trying to validate the given employee";
    public final String ORGANIZATION_VALIDATION_ERROR = "there was a problem trying to validate the given organization";
    public final String LOCATION_VALIDATION_ERROR = "there was a problem trying to validate the given location";
    public static final String ORGANIZATION_NOT_FOUND = "there was a problem trying to find the given organization";


    public SvcException(String message) {
        super(message);
    }

}

