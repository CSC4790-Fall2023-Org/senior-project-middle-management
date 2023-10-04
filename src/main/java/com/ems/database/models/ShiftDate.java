package com.ems.database.models;

import com.ems.Exceptions.SvcException;
import org.json.JSONException;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;

public class ShiftDate {

    private int startMonth;
    private int startDay;
    private int startYear;
    private int startHour;
    private int startMinute;
    private boolean isStartAM;
    private int endMonth;
    private int endDay;
    private int endYear;
    private int endHour;
    private int endMinute;
    private boolean isEndAM;

    public ShiftDate() {
    }

    public ShiftDate(int startMonth, int startDay, int startYear, int startHour, int startMinute, boolean isStartAM, int endMonth, int endDay, int endYear, int endHour, int endMinute, boolean isEndAM) {
        this.startMonth = startMonth;
        this.startDay = startDay;
        this.startYear = startYear;
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.isStartAM = isStartAM;
        this.endMonth = endMonth;
        this.endDay = endDay;
        this.endYear = endYear;
        this.endHour = endHour;
        this.endMinute = endMinute;
        this.isEndAM = isEndAM;
    }

    public ShiftDate(final JSONObject pJsonObject) throws JSONException, SvcException {
        int[] startDate = parseDateGiven(pJsonObject.getString("startDate"));
        int[] endDate = parseDateGiven(pJsonObject.getString("endDate"));
        this.startMonth = startDate[0];
        this.startDay = startDate[1];
        this.startYear = startDate[2];
        this.isStartAM = pJsonObject.getBoolean("isStartAM");
        this.startHour = convertTimeTo24Hour(pJsonObject.getInt("startHour"), isStartAM);
        this.startMinute = pJsonObject.getInt("startMinute");
        this.endMonth = endDate[0];
        this.endDay = endDate[1];
        this.endYear = endDate[2];
        this.isEndAM = pJsonObject.getBoolean("isEndAM");
        this.endHour = convertTimeTo24Hour(pJsonObject.getInt("endHour"), isEndAM);
        this.endMinute = pJsonObject.getInt("endMinute");
    }

    public int getStartMonth() {
        return startMonth;
    }

    public void setStartMonth(int startMonth) {
        this.startMonth = startMonth;
    }

    public int getStartDay() {
        return startDay;
    }

    public void setStartDay(int startDay) {
        this.startDay = startDay;
    }

    public int getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
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

    public int getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(int endMonth) {
        this.endMonth = endMonth;
    }

    public int getEndDay() {
        return endDay;
    }

    public void setEndDay(int endDay) {
        this.endDay = endDay;
    }

    public int getEndYear() {
        return endYear;
    }

    public void setEndYear(int endYear) {
        this.endYear = endYear;
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

    public static int[] parseDateGiven(final String pDateString) throws SvcException {
        String[] splitString = pDateString.split("/");
        int[] result = Arrays.stream(splitString).mapToInt(Integer::parseInt).toArray();
        if (result.length == 3) {
            return result;
        } else {
            throw new SvcException("Error parsing date");
        }
    }

    public static int convertTimeTo24Hour(final int pHour, final boolean pIsAM) {
        if (pIsAM) {
            if (pHour == 12) {
                return 0;
            } else {
                return pHour;
            }
        } else {
            if (pHour == 12) {
                return 12;
            } else {
                return pHour + 12;
            }
        }
    }
}
