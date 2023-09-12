package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "employees")
public class Employee {

    @Id
    private ObjectId employeeId;

    @Field
    private String employeeName;


    public Employee() {
    }

    public Employee(ObjectId employeeId, String employeeName) {
        this.employeeId = employeeId;
        this.employeeName = employeeName;
    }

public ObjectId getEmployeeId() {
        return employeeId;
    }
}
