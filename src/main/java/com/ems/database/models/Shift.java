package com.ems.database.models;

import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Objects;


@Document(collection = "shifts")
public class Shift {

    @Id
    private ObjectId shiftId;
    @Field
    private ObjectId locationId;
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
    @Field
    private boolean isDropApproved;
    @Field
    private ObjectId transferEmployeeId;
    public Shift() {
    }

    public Shift(ObjectId shiftId, ObjectId locationId, String shiftName, LocalDateTime shiftStartTime, LocalDateTime shiftEndTime, String shiftType, boolean isShiftOpen, boolean dropApproved) {
        this.shiftId = shiftId;
        this.locationId = locationId;
        this.shiftName = shiftName;
        this.shiftStartTime = shiftStartTime;
        this.shiftEndTime = shiftEndTime;
        this.shiftType = shiftType;
        this.isShiftOpen = isShiftOpen;
        this.isDropApproved = dropApproved;
        this.transferEmployeeId = null;
    }

    public Shift(final JSONObject pJsonObject) throws JSONException {
        this.shiftName = pJsonObject.getString("shiftName");
        int shiftStartHour = pJsonObject.getInt("shiftStartHour");
        int shiftStartMinute = pJsonObject.getInt("shiftStartMinute");
        int shiftEndHour = pJsonObject.getInt("shiftEndHour");
        int shiftEndMinute = pJsonObject.getInt("shiftEndMinute");
        int shiftStartDay = pJsonObject.getInt("shiftStartDay");
        int shiftStartMonth = pJsonObject.getInt("shiftStartMonth");
        int shiftStartYear = pJsonObject.getInt("shiftStartYear");
        int shiftEndDay = pJsonObject.getInt("shiftEndDay");
        int shiftEndMonth = pJsonObject.getInt("shiftEndMonth");
        int shiftEndYear = pJsonObject.getInt("shiftEndYear");
        this.shiftStartTime = LocalDateTime.of(shiftStartYear, shiftStartMonth, shiftStartDay, shiftStartHour, shiftStartMinute);
        this.shiftEndTime = LocalDateTime.of(shiftEndYear, shiftEndMonth, shiftEndDay, shiftEndHour, shiftEndMinute);
        this.shiftType = pJsonObject.getString("shiftType");
        this.isShiftOpen = true;
        this.locationId = new ObjectId(pJsonObject.getString("locationId"));
        this.isDropApproved = true;
        this.transferEmployeeId = null;
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

    public ObjectId getLocationId() {
        return locationId;
    }

    public void setLocationId(ObjectId locationId) {
        this.locationId = locationId;
    }

    public boolean isDropApproved() {
        return isDropApproved;
    }

    public void setDropApproved(boolean dropApproved) {
        this.isDropApproved = dropApproved;
    }

    public ObjectId getTransferEmployeeId() {
        return transferEmployeeId;
    }

    public void setTransferEmployeeId(ObjectId transferEmployeeId) {
        this.transferEmployeeId = transferEmployeeId;
    }

    @Override
    public String toString() {
        return "Shift{" +
                "shiftId=" + shiftId +
                ", locationId=" + locationId +
                ", shiftName='" + shiftName + '\'' +
                ", shiftStartTime=" + shiftStartTime +
                ", shiftEndTime=" + shiftEndTime +
                ", shiftType='" + shiftType + '\'' +
                ", isShiftOpen=" + isShiftOpen +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Shift shift = (Shift) o;

        if (!Objects.equals(shiftName, shift.shiftName)) return false;
        if (!Objects.equals(shiftStartTime, shift.shiftStartTime))
            return false;
        if (!Objects.equals(shiftEndTime, shift.shiftEndTime)) return false;
        return Objects.equals(shiftType, shift.shiftType);
    }

    @Override
    public int hashCode() {
        int result = shiftName != null ? shiftName.hashCode() : 0;
        result = 31 * result + (shiftStartTime != null ? shiftStartTime.hashCode() : 0);
        result = 31 * result + (shiftEndTime != null ? shiftEndTime.hashCode() : 0);
        result = 31 * result + (shiftType != null ? shiftType.hashCode() : 0);
        return result;
    }
}
