package com.ems.database.models;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
import com.ems.Utils.ValidationUtils;
import org.json.JSONObject;

import java.time.LocalDate;
import java.util.List;

public class ShiftHelper {

    private LocalDate startDate;
    private LocalDate endDate;
    private int startHour;
    private int startMinute;
    private boolean isStartAM;
    private int endHour;
    private int endMinute;
    private boolean isEndAM;
    private String shiftName;
    private String shiftType;
    private Integer repeatsEvery;
    private List<Integer> daysOfWeek;


    public ShiftHelper() {}

    public ShiftHelper(LocalDate startDate, LocalDate endDate, int startHour, int startMinute, boolean isStartAM, int endHour, int endMinute, boolean isEndAM, String shiftName, String shiftType, Integer repeatsEvery, List<Integer> daysOfWeek) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.isStartAM = isStartAM;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.isEndAM = isEndAM;
        this.shiftName = shiftName;
        this.shiftType = shiftType;
        this.repeatsEvery = repeatsEvery;
        this.daysOfWeek = daysOfWeek;
    }

    public ShiftHelper(final JSONObject pJsonObject) throws SvcException {
        try{
            this.startDate = parseDate(pJsonObject.getString("startDate"));
            this.endDate = parseDate(pJsonObject.getString("endDate"));
            this.startHour = convertToMilitaryTime(pJsonObject.getInt("startHour"), pJsonObject.getBoolean("isStartAM"));
            this.startMinute = pJsonObject.getInt("startMinute");
            this.isStartAM = pJsonObject.getBoolean("isStartAM");
            this.endHour = convertToMilitaryTime(pJsonObject.getInt("endHour"), pJsonObject.getBoolean("isEndAM"));
            this.endMinute = pJsonObject.getInt("endMinute");
            this.isEndAM = pJsonObject.getBoolean("isEndAM");
            this.shiftName = pJsonObject.getString("shiftName");
            this.shiftType = pJsonObject.getString("shiftType");
            this.repeatsEvery = pJsonObject.getInt("repeatsEvery");
            this.daysOfWeek = JsonUtils.convertJsonArrayToListInteger(pJsonObject.getJSONArray("daysOfWeek"));

        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("error creating shift helper from json");
        }
    }




    public static LocalDate parseDate(final String pDate) throws SvcException {
            String[] dateParts = pDate.split("/");
            int year = Integer.parseInt(dateParts[0]);
            int month = Integer.parseInt(dateParts[1]);
            int day = Integer.parseInt(dateParts[2]);


            ValidationUtils.validateDate(year, month, day);
            return LocalDate.of(year, month, day);
    }

    public static int convertToMilitaryTime(final int pHour, final boolean pIsAM){
        if(pIsAM){
            if(pHour == 12){
                return 0;
            }
            else{
                return pHour;
            }
        }
        else{
            if(pHour == 12){
                return 12;
            }
            else{
                return pHour + 12;
            }
        }
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getStartHour() {
        return startHour;
    }

    public void setStartHour(int startHour) {
        this.startHour = startHour;
    }

    public int getStartMinute() {
        return startMinute;
    }

    public void setStartMinute(int startMinute) {
        this.startMinute = startMinute;
    }

    public boolean isStartAM() {
        return isStartAM;
    }

    public void setStartAM(boolean startAM) {
        isStartAM = startAM;
    }

    public int getEndHour() {
        return endHour;
    }

    public void setEndHour(int endHour) {
        this.endHour = endHour;
    }

    public int getEndMinute() {
        return endMinute;
    }

    public void setEndMinute(int endMinute) {
        this.endMinute = endMinute;
    }

    public boolean isEndAM() {
        return isEndAM;
    }

    public void setEndAM(boolean endAM) {
        isEndAM = endAM;
    }

    public String getShiftName() {
        return shiftName;
    }

    public void setShiftName(String shiftName) {
        this.shiftName = shiftName;
    }

    public String getShiftType() {
        return shiftType;
    }

    public void setShiftType(String shiftType) {
        this.shiftType = shiftType;
    }

    public Integer getRepeatsEvery() {
        return repeatsEvery;
    }

    public void setRepeatsEvery(Integer repeatsEvery) {
        this.repeatsEvery = repeatsEvery;
    }

    public List<Integer> getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(List<Integer> daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }
}
