package com.ems.Utils;

import java.time.LocalDateTime;

public class DateUtils {
    public static double getHoursBetweenShifts(final LocalDateTime pStartDate, final LocalDateTime pEndDate){
        return (pEndDate.getHour() - pStartDate.getHour()) + ((pEndDate.getMinute() - pStartDate.getMinute()) / 60.0);
    }
}
