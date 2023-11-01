package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Shift;
import com.ems.database.models.ShiftHelper;
import com.ems.services.DatabaseServices;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    public static boolean validateShiftForEmployee(final Shift pShift, final Employee pEmployee, final int pWeeksToRelease, final List<Shift> pSeenShifts) {
        // location of shift is one of the locations that the employee works at
        if (!pEmployee.getLocationIdList().contains(pShift.getLocationId())) {
            return false;
        }

        // start time is within release window
        if (!pShift.getShiftStartTime().isBefore(LocalDate.now().plusWeeks(pWeeksToRelease).atStartOfDay())) {
            return false;
        }

        // shift is after now
        if (!pShift.getShiftStartTime().isAfter(LocalDate.now().atTime(pShift.getShiftStartTime().getHour(), pShift.getShiftStartTime().getMinute()))) {
            return false;
        }

        // shift type is one of the guard type
        if (!pEmployee.getEmployeeType().equals(pShift.getShiftType())) {
            return false;
        }

        // employee has shift at same time
        if (doesEmployeeHaveShiftAtSameTime(pEmployee, pShift)){
            return false;
        }

        // if shift has already been added to result
        if (doesResultAlreadyHaveShift(pSeenShifts, pShift)){
            return false;
        }

        // shift is open and approved to be dropped
        return pShift.isShiftOpen() && pShift.isDropApproved();
    }


    public static boolean doesEmployeeHaveShiftAtSameTime(final Employee pEmployee, final Shift pShift){
        for (ObjectId shiftId : pEmployee.getShiftIdList()){
            Shift shiftToTest = DatabaseServices.findShiftById(shiftId).orElseThrow();
            if (shiftToTest.equals(pShift)){
                return true;
            }

        }
        return false;
    }

    public static boolean doesResultAlreadyHaveShift(final List<Shift> pSeen, final Shift pShift){
        for (Shift shiftToTest : pSeen){
            if (shiftToTest.equals(pShift)){
                return true;
            }
        }
        return false;
    }

    public static boolean validateClaimedShiftForEmployee(final Shift pShift){

        // shift start time is before now
        if (pShift.getShiftStartTime().isBefore(LocalDateTime.now())){
            return false;
        }

        // shift is being reviewed by manager
        if (!pShift.isDropApproved()){
            return false;
        }

        return true;
    }
}
