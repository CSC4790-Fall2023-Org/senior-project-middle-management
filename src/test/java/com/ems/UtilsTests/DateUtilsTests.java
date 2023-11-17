package com.ems.UtilsTests;

import org.junit.jupiter.api.Test;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DateUtilsTests {
    @Test
    public void testGetHoursBetweenShifts(){
        {
            // shift of 5 hours
            final LocalDateTime startTime = LocalDateTime.of(2023, 1, 1, 10, 0);
            final LocalDateTime endTime  = LocalDateTime.of(2023, 1, 1, 15, 0);
            final double hoursBetween = com.ems.Utils.DateUtils.getHoursBetweenShifts(startTime, endTime);
            assertEquals(5.0, hoursBetween);
        }
        {
            // shift of 8.5 hours
            final LocalDateTime startTime = LocalDateTime.of(2023, 1, 1, 10, 0);
            final LocalDateTime endTime = LocalDateTime.of(2023, 1, 1, 18, 30);
            final double hoursBetween = com.ems.Utils.DateUtils.getHoursBetweenShifts(startTime, endTime);
            assertEquals(8.5, hoursBetween);
        }
    }

    @Test
    public void testConvertFromMilitaryToUsable(){
        {
            // 10AM
            final LocalDateTime time = LocalDateTime.of(2023, 1, 1, 10, 0);
            final String convertedTime = com.ems.Utils.DateUtils.convertFromMilitaryTimeToUsable(time);
            assertEquals("10:00am", convertedTime);
        }
        {
            // 12AM
            final LocalDateTime time = LocalDateTime.of(2023, 1, 1, 0, 0);
            final String convertedTime = com.ems.Utils.DateUtils.convertFromMilitaryTimeToUsable(time);
            assertEquals("12:00am", convertedTime);
        }
        {
            // 12PM
            final LocalDateTime time = LocalDateTime.of(2023, 1, 1, 12, 0);
            final String convertedTime = com.ems.Utils.DateUtils.convertFromMilitaryTimeToUsable(time);
            assertEquals("12:00pm", convertedTime);
        }
        {
            // 10:30AM
            final LocalDateTime time = LocalDateTime.of(2023, 1, 1, 10, 30);
            final String convertedTime = com.ems.Utils.DateUtils.convertFromMilitaryTimeToUsable(time);
            assertEquals("10:30am", convertedTime);
        }
        {
            // 3:30PM
            final LocalDateTime time = LocalDateTime.of(2023, 1, 1, 15, 30);
            final String convertedTime = com.ems.Utils.DateUtils.convertFromMilitaryTimeToUsable(time);
            assertEquals("3:30pm", convertedTime);
        }
    }

}
