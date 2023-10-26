package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.ShiftHelper;

import java.time.LocalDate;

public class ValidationUtils {

    public static void validateDate(final int pYear, final int pMonth, final int pDay) throws SvcException {
        if (pYear < LocalDate.now().getYear()){
            throw new SvcException("year is invalid");
        }

        if (pMonth > 12 || pMonth < 1){
            throw new SvcException("month is invalid");
        }

        if (pDay > LocalDate.of(pYear, pMonth, 1).lengthOfMonth() || pDay < 1){
            throw new SvcException("day is invalid");
        }
    }

    public static void validateShiftHelper(final ShiftHelper pShiftHelper) throws SvcException {
        // start date is before today
        if (pShiftHelper.getStartDate().isBefore(LocalDate.now())){
            throw new SvcException("start date is before today");
        }

        // end date is before today
        if (pShiftHelper.getEndDate().isBefore(LocalDate.now())){
            throw new SvcException("end date is before today");
        }

        // start date is after end date
        if (pShiftHelper.getStartDate().isAfter(pShiftHelper.getEndDate())){
            throw new SvcException("start date is after end date");
        }

        // start hour is after end hour
        if (pShiftHelper.getStartHour() > pShiftHelper.getEndHour()){
            throw new SvcException("start hour is after end hour");
        }

        // start hour is equal to end hour and end minute is before start minute
        if (pShiftHelper.getStartHour() == pShiftHelper.getEndHour() && pShiftHelper.getEndMinute() < pShiftHelper.getStartMinute()){
            throw new SvcException("start hour is equal to end hour and end minute is before start minute");
        }

        // start hour is equal to end hour and end minute is equal to start minute
        if (pShiftHelper.getStartHour() == pShiftHelper.getEndHour() && pShiftHelper.getEndMinute() == pShiftHelper.getStartMinute()){
            throw new SvcException("start hour is equal to end hour and end minute is equal to start minute");
        }

        // location does not exist
        if (!DatabaseUtils.locationExists(pShiftHelper.getLocationId())) {
            throw new SvcException("location does not exist");
        }
    }
}
