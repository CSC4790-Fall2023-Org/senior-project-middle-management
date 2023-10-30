package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "organizations")
public class Organization {

    @Id
    private ObjectId organizationId;

    @Field
    private String organizationName;

    @Field
    private String orgOwnerEmail;

    @Field
    private List<Location> locationList;

    @Field
    private int weeksToRelease;

    public Organization() {
    }

public Organization(ObjectId organizationId, String organizationName, String orgOwnerEmail, List<Location> locationList, int weeksToRelease) {
        this.organizationId = organizationId;
        this.organizationName = organizationName;
        this.orgOwnerEmail = orgOwnerEmail;
        this.locationList = locationList;
        this.weeksToRelease = weeksToRelease;
    }

    public ObjectId getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(ObjectId organizationId) {
        this.organizationId = organizationId;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getOrgOwnerEmail() {
        return orgOwnerEmail;
    }

    public void setOrgOwnerEmail(String orgOwnerEmail) {
        this.orgOwnerEmail = orgOwnerEmail;
    }

    public List<Location> getLocationList() {
        return locationList;
    }

    public void setLocationList(List<Location> locationList) {
        this.locationList = locationList;
    }

    public int getWeeksToRelease() {
        return weeksToRelease;
    }

    public void setWeeksToRelease(int weeksToRelease) {
        this.weeksToRelease = weeksToRelease;
    }

    @Override
    public String toString() {
        return "Organization{" +
                "organizationId=" + organizationId +
                ", organizationName='" + organizationName + '\'' +
                ", orgOwnerEmail='" + orgOwnerEmail + '\'' +
                ", locationList=" + locationList +
                '}';
    }
}
