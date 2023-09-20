package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Document(collection = "shifts")
public class Shift {

    @Id
    private ObjectId shiftId;

    @Id
    private ObjectId locationId;

    @Field
    private String shiftName;

    @Field
    private Date shiftStartTime;

    @Field
    private Date shiftEndTime;

    @Field
    private String shiftType;

    @Field
    private boolean isShiftOpen;

    public Shift() {
    }

    public Shift(ObjectId shiftId, ObjectId locationId, String shiftName, Date shiftStartTime, Date shiftEndTime, String shiftType, boolean isShiftOpen) {
        this.shiftId = shiftId;
        this.locationId = locationId;
        this.shiftName = shiftName;
        this.shiftStartTime = shiftStartTime;
        this.shiftEndTime = shiftEndTime;
        this.shiftType = shiftType;
        this.isShiftOpen = isShiftOpen;
    }

    public ObjectId getShiftId() {
        return shiftId;
    }

    public ObjectId getLocationId() {
        return locationId;
    }

    public String getShiftName() {
        return shiftName;
    }

    public Date getShiftStartTime() {
        return shiftStartTime;
    }

    public void setShiftStartTime(Date shiftStartTime) {
        this.shiftStartTime = shiftStartTime;
    }

    public Date getShiftEndTime() {
        return shiftEndTime;
    }

    public void setShiftEndTime(Date shiftEndTime) {
        this.shiftEndTime = shiftEndTime;
    }

    public String getShiftType() {
        return shiftType;
    }

    public void setShiftType(String shiftType) {
        this.shiftType = shiftType;
    }

    public boolean isShiftOpen() {
        return isShiftOpen;
    }

    public void setShiftOpen(boolean shiftOpen) {
        isShiftOpen = shiftOpen;
    }
}