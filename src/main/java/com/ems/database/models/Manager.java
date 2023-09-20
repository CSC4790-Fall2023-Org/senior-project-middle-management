package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "managers")
public class Manager {

    @Id
    private ObjectId managerId;

    @Field
    private String managerName;

    @Field
    private String managerEmail;

    @Field
    private String managerPhoneNumber;

    @Field
    private String firstName;

    @Field
    private String lastName;

    @Field
    private ObjectId organizationId;

    @Field
    private List<Location> locationList;

    public Manager() {
        this.managerId = new ObjectId();
    }

    public Manager(ObjectId managerId, String managerName, String managerEmail, String managerPhoneNumber, String firstName, String lastName, ObjectId organizationId, List<Location> locationList) {
        this.managerId = managerId;
        this.managerName = managerName;
        this.managerEmail = managerEmail;
        this.managerPhoneNumber = managerPhoneNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.organizationId = organizationId;
        this.locationList = locationList;
    }

    public ObjectId getManagerId() {
        return managerId;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerEmail() {
        return managerEmail;
    }

    public void setManagerEmail(String managerEmail) {
        this.managerEmail = managerEmail;
    }

    public String getManagerPhoneNumber() {
        return managerPhoneNumber;
    }

    public void setManagerPhoneNumber(String managerPhoneNumber) {
        this.managerPhoneNumber = managerPhoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public ObjectId getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(ObjectId organizationId) {
        this.organizationId = organizationId;
    }

    public void setManagerId(ObjectId managerId) {
        this.managerId = managerId;
    }

    public List<Location> getLocationList() {
        return locationList;
    }

    public void setLocationList(List<Location> locationList) {
        this.locationList = locationList;
    }
}
