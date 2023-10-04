package com.ems.ModelsTests;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.ShiftDate;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ShiftDateTests {

    @Test
    public void testParseDateGiven() {
        int startMonth = 10;
        int startDay = 1;
        int startYear = 2023;

        try{
            String startDate = startMonth + "/" + startDay + "/" + startYear;

            int[] result = ShiftDate.parseDateGiven(startDate);

            assertEquals(startMonth, result[0]);
            assertEquals(startDay, result[1]);
            assertEquals(startYear, result[2]);
        } catch (SvcException e) {
            fail();
        }

        try {
            String startDate = startMonth + "/" + startDay + startYear;

            int[] result = ShiftDate.parseDateGiven(startDate);

        } catch (SvcException e) {
            assertEquals("Error parsing date", e.getMessage());
        }
    }

    @Test
    public void testConvertTimeTo24Hour() {
        {
            int amHour = 12;
            int pmHour = 12;
            boolean isStartAM = true;
            boolean isEndAM = false;

            assertEquals(0, ShiftDate.convertTimeTo24Hour(amHour, isStartAM));
            assertEquals(12, ShiftDate.convertTimeTo24Hour(pmHour, isEndAM));
        }

        {
            int amHour = 10;
            int pmHour = 10;
            boolean isStartAM = true;
            boolean isEndAM = false;

            assertEquals(10, ShiftDate.convertTimeTo24Hour(amHour, isStartAM));
            assertEquals(22, ShiftDate.convertTimeTo24Hour(pmHour, isEndAM));
        }
    }
}
