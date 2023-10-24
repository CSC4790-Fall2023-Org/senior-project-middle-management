package com.ems.database.models;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.ValidationUtils;
import org.json.JSONObject;

import java.time.LocalDate;

public class ShiftHelper {

    private LocalDate startDate;
    private LocalDate endDate;
    private int startHour;
    private int startMinute;
    private boolean isStartAM;
    private int endHour;
    private int endMinute;
    private boolean isEndAM;



    public ShiftHelper() {}

    public ShiftHelper(LocalDate startDate, LocalDate endDate, int startHour, int startMinute, boolean isStartAM, int endHour, int endMinute, boolean isEndAM) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.isStartAM = isStartAM;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.isEndAM = isEndAM;
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
}
