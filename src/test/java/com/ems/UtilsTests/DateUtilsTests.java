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

}
