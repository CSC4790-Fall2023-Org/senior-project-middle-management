package com.ems.Utils;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class DateUtils {
    public static double getHoursBetweenShifts(final LocalDateTime pStartDate, final LocalDateTime pEndDate){
        return (pEndDate.getHour() - pStartDate.getHour()) + ((pEndDate.getMinute() - pStartDate.getMinute()) / 60.0);
    }

    public static String getCorrectDateFormatFromLocalDateTime(final LocalDateTime pDate){
        return pDate.getDayOfWeek().name().substring(0, 3)+ "" + pDate.getMonth().name().substring(0,3) + " " + pDate.getDayOfMonth();
    }

    public static String getCorrectTimeFromLocalDateTime(final LocalDateTime pDate){
        String isAMORPM = pDate.getHour() < 12 ? "am" : "pm";
//        String
        return pDate.getHour() + ":" + pDate.getMinute() + "" + isAMORPM;
    }


    public static String convertFromMilitaryTimeToUsable(final LocalDateTime pDate){
        final DecimalFormat df = new DecimalFormat("#00");
        String isAMORPM = pDate.getHour() < 12 ? "am" : "pm";
        String hour = String.valueOf(pDate.getHour() < 12 ? pDate.getHour() : pDate.getHour() - 12);
        hour = hour.equals("0") ? "12" : hour;
        return hour + ":" + df.format(pDate.getMinute()) + "" + isAMORPM;
    }



}
