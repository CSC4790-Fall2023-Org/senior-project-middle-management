package com.ems.database.models;

import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


public class Location {

    private ObjectId locationId;

    private String locationName;

    private double maxHours;

    public Location() {
    }

    public Location(ObjectId locationId, String locationName) {
        this.locationId = locationId;
        this.locationName = locationName;
    }

    public Location(ObjectId locationId, String locationName, double maxHours) {
        this.locationId = locationId;
        this.locationName = locationName;
        this.maxHours = maxHours;
    }

    public ObjectId getLocationId() {
        return locationId;
    }

    public void setLocationId(ObjectId locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public double getMaxHours() {
        return maxHours;
    }

    public void setMaxHours(double maxHours) {
        this.maxHours = maxHours;
    }

    public Location(final JSONObject pJsonObject) throws JSONException {
        this.locationId = new ObjectId();
        this.locationName = pJsonObject.getString("locationName");
        this.maxHours = pJsonObject.getDouble("maxHours");
    }

    @Override
    public String toString() {
        return "{" +
                "locationId=" + locationId +
                ", locationName='" + locationName + '\'' +
                ", maxHours=" + maxHours +
                '}';
    }
}
