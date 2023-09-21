package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "managers")
public class Manager {

    @Id
    private ObjectId managerId;

    @Field
    private String managerName;

    public Manager() {
    }

    public Manager(ObjectId managerId, String managerName) {
        this.managerId = managerId;
        this.managerName = managerName;
    }

    public ObjectId getManagerId() {
        return managerId;
    }
}
