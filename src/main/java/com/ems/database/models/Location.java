package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


public class Location {

    private ObjectId locationId;

    private String locationName;

    public Location() {
    }

    public Location(ObjectId locationId, String locationName) {
        this.locationId = locationId;
        this.locationName = locationName;
    }

    public ObjectId getLocationId() {
        return locationId;
    }
}
