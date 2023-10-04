package com.ems.Utils;

import com.ems.database.models.ShiftDate;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class ShiftDateUtils {
    public int getDaysBetweenDates(final ShiftDate pShiftDate){
        final LocalDate startDate = LocalDate.of(pShiftDate.getStartYear(), pShiftDate.getStartMonth(), pShiftDate.getStartDay());
        final LocalDate endDate = LocalDate.of(pShiftDate.getEndYear(), pShiftDate.getEndMonth(), pShiftDate.getEndDay());
        return (int) ChronoUnit.DAYS.between(startDate, endDate);
    }
}
