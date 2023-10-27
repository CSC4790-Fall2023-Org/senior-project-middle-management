package com.ems.database.models;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
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
    private List<ObjectId> locationIdList;
    @Field
    private List<String> shiftTypeList;

    public Manager() {
    }

    public Manager(ObjectId managerId, String firstName, String lastName, String managerEmail, String managerPhoneNumber, ObjectId organizationId, List<ObjectId> locationIdList, List<String> shiftTypeList) {
        this.managerId = managerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.managerEmail = managerEmail;
        this.managerPhoneNumber = managerPhoneNumber;
        this.organizationId = organizationId;
        this.locationIdList = locationIdList;
        this.shiftTypeList = shiftTypeList;
    }

    public Manager(final JSONObject pJsonObject) throws JSONException, SvcException {
        this.firstName = (String) pJsonObject.get("firstName");
        this.lastName = (String) pJsonObject.get("lastName");
        this.managerEmail = (String) pJsonObject.get("managerEmail");
        this.managerPhoneNumber = (String) pJsonObject.get("managerPhoneNumber");
        this.organizationId = new ObjectId((String) pJsonObject.get("organizationId"));
        this.locationIdList = JsonUtils.getLocationIdListFromJson(pJsonObject.getJSONArray("locationIdList"));
        this.shiftTypeList = JsonUtils.getShiftTypeListFromJSON(pJsonObject.getJSONArray("shiftTypeList"));

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

    public List<ObjectId> getLocationIdList() {
        return locationIdList;
    }

    public void setLocationIdList(List<ObjectId> locationIdList) {
        this.locationIdList = locationIdList;
    }

    public List<String> getShiftTypeList() {
        return shiftTypeList;
    }

    public void setShiftTypeList(List<String> shiftTypeList) {
        this.shiftTypeList = shiftTypeList;
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
                ", locationList=" + locationIdList +
                '}';
    }
}
