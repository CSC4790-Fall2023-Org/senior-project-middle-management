package com.ems.Utils;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateUtils {
    public static double getHoursBetweenShifts(final LocalDateTime pStartDate, final LocalDateTime pEndDate){
        return (pEndDate.getHour() - pStartDate.getHour()) + ((pEndDate.getMinute() - pStartDate.getMinute()) / 60.0);
    }

    public static String getCorrectDateFormatFromLocalDateTime(final LocalDateTime pDate){
        return pDate.getDayOfWeek().name().substring(0, 3)+ "" + pDate.getMonth().name().substring(0,3) + " " + pDate.getDayOfMonth();
    }


}
