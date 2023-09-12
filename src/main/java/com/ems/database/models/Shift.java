package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "shifts")
public class Shift {

    @Id
    private ObjectId shiftId;

    @Field
    private String shiftName;

    public Shift() {
    }

    public Shift(ObjectId shiftId, String shiftName) {
        this.shiftId = shiftId;
        this.shiftName = shiftName;
    }

    public ObjectId getShiftId() {
        return shiftId;
    }

}
