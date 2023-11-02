package com.ems.database.models;

import com.ems.Exceptions.SvcException;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
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
    private int weeksToReleaseShifts;

    public Organization() {
    }

    public Organization(ObjectId organizationId, String organizationName, String orgOwnerEmail, List<Location> locationList, int weeksToReleaseShifts) {
        this.organizationId = organizationId;
        this.organizationName = organizationName;
        this.orgOwnerEmail = orgOwnerEmail;
        this.locationList = locationList;
        this.weeksToReleaseShifts = weeksToReleaseShifts;
    }

    public Organization(ObjectId organizationId, String organizationName, String orgOwnerEmail, List<Location> locationList) {
        this.organizationId = organizationId;
        this.organizationName = organizationName;
        this.orgOwnerEmail = orgOwnerEmail;
        this.locationList = locationList;
    }

    public Organization(JSONObject jsonObject) throws SvcException {
        try{
            this.organizationId = new ObjectId(jsonObject.getString("organizationId"));
            this.organizationName = jsonObject.getString("organizationName");
            this.orgOwnerEmail = jsonObject.getString("orgOwnerEmail");
            this.locationList = parseLocationListFromJSONArray(jsonObject.getJSONArray("locationList"));
            this.weeksToReleaseShifts = jsonObject.getInt("weeksToReleaseShifts");
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("error creating organization from JSON");
        }
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

    private List<Location> parseLocationListFromJSONArray(JSONArray locationArray) throws JSONException {
        List<Location> locationList = new ArrayList<>();
        for (int i = 0; i < locationArray.length(); i++) {
            JSONObject locationObject = locationArray.getJSONObject(i);
            Location location = new Location(locationObject);
            locationList.add(location);
        }
        return locationList;
    }

    public int getWeeksToReleaseShifts() {
        return weeksToReleaseShifts;
    }

    public void setWeeksToReleaseShifts(int weeksToReleaseShifts) {
        this.weeksToReleaseShifts = weeksToReleaseShifts;
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
