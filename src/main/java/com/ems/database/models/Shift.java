package com.ems.database.models;

import org.bson.types.ObjectId;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "shifts")
public class Shift {

    @Id
    private ObjectId shiftId;
    @Field
    private String shiftName;
    @Field
    private LocalDateTime shiftStartTime;
    @Field
    private LocalDateTime shiftEndTime;
    @Field
    private String shiftType;
    @Field
    private boolean isShiftOpen;


    public Shift() {
    }

    public Shift(ObjectId shiftId, String shiftName, LocalDateTime shiftStartTime, LocalDateTime shiftEndTime, String shiftType, boolean isShiftOpen) {
        this.shiftId = shiftId;
        this.shiftName = shiftName;
        this.shiftStartTime = shiftStartTime;
        this.shiftEndTime = shiftEndTime;
        this.shiftType = shiftType;
        this.isShiftOpen = isShiftOpen;
    }

    public ObjectId getShiftId() {
        return shiftId;
    }

    public void setShiftId(ObjectId shiftId) {
        this.shiftId = shiftId;
    }

    public String getShiftName() {
        return shiftName;
    }

    public void setShiftName(String shiftName) {
        this.shiftName = shiftName;
    }

    public LocalDateTime getShiftStartTime() {
        return shiftStartTime;
    }

    public void setShiftStartTime(LocalDateTime shiftStartTime) {
        this.shiftStartTime = shiftStartTime;
    }

    public LocalDateTime getShiftEndTime() {
        return shiftEndTime;
    }

    public void setShiftEndTime(LocalDateTime shiftEndTime) {
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
    @Override
    public String toString() {
        return "Shift{" +
                "shiftId=" + shiftId +
                ", shiftName='" + shiftName + '\'' +
                ", shiftStartTime=" + shiftStartTime +
                ", shiftEndTime=" + shiftEndTime +
                ", shiftType='" + shiftType + '\'' +
                ", isShiftOpen=" + isShiftOpen +
                '}';
    }
}
