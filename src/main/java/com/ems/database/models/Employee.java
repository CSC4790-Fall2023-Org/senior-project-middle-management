package com.ems.database.models;


import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Document(collection = "employees")
public class Employee {

    @Id
    private ObjectId employeeId;
    private String firstName;
    @Field
    private String lastName;
    @Field
    private String employeeEmail;
    @Field
    private String employeePhoneNumber;
    @Field
    private String employeeType;
    @Field
    private double loggedHours;
    @Field
    private double pay;
    @Field
    private ObjectId organizationId;
    @Field
    private List<ObjectId> locationIdList;
    @Field
    private List<ObjectId>  shiftIdList;
    public Employee() {
    }

    public Employee(ObjectId employeeId, String firstName, String lastName, String employeeEmail, String employeePhoneNumber, String employeeType, double loggedHours, double pay, ObjectId organizationId, List<ObjectId> locationIdList, List<ObjectId> shiftIdList) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeEmail = employeeEmail;
        this.employeePhoneNumber = employeePhoneNumber;
        this.employeeType = employeeType;
        this.loggedHours = loggedHours;
        this.pay = pay;
        this.organizationId = organizationId;
        this.locationIdList = locationIdList;
        this.shiftIdList = shiftIdList;
    }

    public Employee(String firstName, String lastName, String employeeEmail, String employeePhoneNumber, String employeeType, double loggedHours, double pay, ObjectId organizationId, List<ObjectId> locationIdList, List<ObjectId> shiftIdList) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.employeeEmail = employeeEmail;
        this.employeePhoneNumber = employeePhoneNumber;
        this.employeeType = employeeType;
        this.loggedHours = loggedHours;
        this.pay = pay;
        this.organizationId = organizationId;
        this.locationIdList = locationIdList;
        this.shiftIdList = shiftIdList;
    }

    public Employee(final JSONObject pJsonObject) throws JSONException, SvcException {
        this.firstName = (String) pJsonObject.get("firstName");
        this.lastName = (String) pJsonObject.get("lastName");
        this.employeeEmail = (String) pJsonObject.get("employeeEmail");
        this.employeePhoneNumber = (String) pJsonObject.get("employeePhoneNumber");
        this.employeeType = (String) pJsonObject.get("employeeType");
        this.loggedHours = 0;
        this.pay = (double) pJsonObject.get("pay");
        this.organizationId = new ObjectId(pJsonObject.getString("organizationId"));
        this.locationIdList = JsonUtils.getLocationIdListFromJson(new JSONArray(pJsonObject.get("locationIdList").toString()));
        this.shiftIdList = List.of();
    }

    public void setEmployeeId(ObjectId employeeId) {
        this.employeeId = employeeId;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public void setEmployeePhoneNumber(String employeePhoneNumber) {
        this.employeePhoneNumber = employeePhoneNumber;
    }

    public void setEmployeeType(String employeeType) {
        this.employeeType = employeeType;
    }

    public void setLoggedHours(double loggedHours) {
        this.loggedHours = loggedHours;
    }

    public void setPay(double pay) {
        this.pay = pay;
    }

    public void setOrganizationId(ObjectId organizationId) {
        this.organizationId = organizationId;
    }

    public void setLocationIdList(List<ObjectId> locationIdList) {
        this.locationIdList = locationIdList;
    }

    public void setShiftIdList(List<ObjectId> shiftIdList) {
        this.shiftIdList = shiftIdList;
    }

    public ObjectId getEmployeeId() {
        return employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public String getEmployeePhoneNumber() {
        return employeePhoneNumber;
    }

    public String getEmployeeType() {
        return employeeType;
    }

    public double getLoggedHours() {
        return loggedHours;
    }

    public double getPay() {
        return pay;
    }

    public ObjectId getOrganizationId() {
        return organizationId;
    }

    public List<ObjectId> getLocationIdList() {
        return locationIdList;
    }

    public List<ObjectId> getShiftIdList() {
        return shiftIdList;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "employeeId=" + employeeId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", employeeEmail='" + employeeEmail + '\'' +
                ", employeePhoneNumber='" + employeePhoneNumber + '\'' +
                ", employeeType='" + employeeType + '\'' +
                ", loggedHours=" + loggedHours +
                ", pay=" + pay +
                ", organizationId=" + organizationId +
                ", locationIdList=" + locationIdList +
                ", shiftIdList=" + shiftIdList +
                '}';
    }
}
