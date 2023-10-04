package com.ems.UtilsTests;

import com.ems.Utils.ShiftDateUtils;
import com.ems.Utils.TestUtils;
import com.ems.database.models.ShiftDate;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ShiftDateUtilsTests {

    @Test
    public void testGetDaysBetweenDates() {
        ShiftDate shiftDate = TestUtils.getBaseShiftDate();
        assertEquals(123, ShiftDateUtils.getDaysBetweenDates(shiftDate));


    }
}
