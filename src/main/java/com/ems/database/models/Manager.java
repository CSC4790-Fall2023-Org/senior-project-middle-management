package com.ems.database.models;

import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "managers")
public class Manager {
    @Id
    private ObjectId managerId;
    @Field
    private String firstName;
    @Field
    private String lastName;
    @Field
    private String managerEmail;
    @Field
    private String managerPhoneNumber;
    @Field
    private ObjectId organizationId;
    @Field
    private List<Location> locationList;

    public Manager() {
    }

    public Manager(ObjectId managerId, String firstName, String lastName, String managerEmail, String managerPhoneNumber, ObjectId organizationId, List<Location> locationList) {
        this.managerId = managerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.managerEmail = managerEmail;
        this.managerPhoneNumber = managerPhoneNumber;
        this.organizationId = organizationId;
        this.locationList = locationList;
    }

    public Manager(final JSONObject pJsonObject) throws JSONException {
        this.firstName = (String) pJsonObject.get("firstName");
        this.lastName = (String) pJsonObject.get("lastName");
        this.managerEmail = (String) pJsonObject.get("managerEmail");
        this.managerPhoneNumber = (String) pJsonObject.get("managerPhoneNumber");
        this.organizationId = new ObjectId((String) pJsonObject.get("organizationId"));
        this.locationList = List.of(new Location((JSONObject) pJsonObject.get("locationList")));
    }

    public ObjectId getManagerId() {
        return managerId;
    }

    public void setManagerId(ObjectId managerId) {
        this.managerId = managerId;
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

    public ObjectId getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(ObjectId organizationId) {
        this.organizationId = organizationId;
    }

    public List<Location> getLocationList() {
        return locationList;
    }

    public void setLocationList(List<Location> locationList) {
        this.locationList = locationList;
    }

    @Override
    public String toString() {
        return "Manager{" +
                "managerId=" + managerId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", managerEmail='" + managerEmail + '\'' +
                ", managerPhoneNumber='" + managerPhoneNumber + '\'' +
                ", organizationId=" + organizationId +
                ", locationList=" + locationList +
                '}';
    }
}
