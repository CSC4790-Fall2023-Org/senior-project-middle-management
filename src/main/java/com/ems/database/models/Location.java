package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "locations")
public class Location {

    @Id
    private ObjectId locationId;

    @Field
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
