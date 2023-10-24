package com.ems.UtilsTests;

import com.ems.Utils.ShiftUtils;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ShiftUtilsTests {

    @Test
    public void testGetDatesBetweenTwoDates(){
        {
            // 2023/01/01 - 2023/01/31
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            assertEquals(31, datesBetween.size());
        }
        {
            // 2023/01/01 - 2023/01/01
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 1, 1);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            assertEquals(1, datesBetween.size());
        }
        {
            // 2023/01/01 - 2023/12/31
            final LocalDate startDate = LocalDate.of(2023, 1, 1);
            final LocalDate endDate = LocalDate.of(2023, 12, 31);
            final List<LocalDate> datesBetween = ShiftUtils.getDatesBetweenTwoDates(startDate, endDate);
            assertEquals(365, datesBetween.size());
        }
    }
}
