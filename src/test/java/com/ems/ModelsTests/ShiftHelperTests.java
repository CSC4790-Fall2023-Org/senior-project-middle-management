package com.ems.ModelsTests;

import com.ems.Exceptions.SvcException;
import com.ems.TestFactory.JsonTestFactory;
import com.ems.TestFactory.ModelTestFactory;
import com.ems.database.models.ShiftHelper;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class ShiftHelperTests {

    @Test
    public void testConvertToMilitaryTime() {
        {
            // 10 AM
            int hour = 10;
            boolean isAM = true;
            assertEquals(10, ShiftHelper.convertToMilitaryTime(hour, isAM));
        }
        {
            // 12 AM
            int hour = 12;
            boolean isAM = true;
            assertEquals(0, ShiftHelper.convertToMilitaryTime(hour, isAM));
        }
        {
            // 10 PM
            int hour = 10;
            boolean isAM = false;
            assertEquals(22, ShiftHelper.convertToMilitaryTime(hour, isAM));
        }
        {
            // 12 PM
            int hour = 12;
            boolean isAM = false;
            assertEquals(12, ShiftHelper.convertToMilitaryTime(hour, isAM));
        }
    }

    @Test
    public void testParseDate(){
        {
            // 2023/01/01
            try{
                final String date = "2023/01/01";
                final LocalDate parsedDate = ShiftHelper.parseDate(date);
                assertEquals(2023, parsedDate.getYear());
                assertEquals(1, parsedDate.getMonthValue());
                assertEquals(1, parsedDate.getDayOfMonth());
            }
            catch (SvcException e){
                fail();
            }
        }
        {
            try{
                // 2023/12/31
                final String date = "2023/12/31";
                final LocalDate parsedDate = ShiftHelper.parseDate(date);
                assertEquals(2023, parsedDate.getYear());
                assertEquals(12, parsedDate.getMonthValue());
                assertEquals(31, parsedDate.getDayOfMonth());
            } catch (SvcException e) {
                fail();
            }

        }
        {
            try{
                // 2023/01/32 -> error with date
                final String date = "2023/01/32";
                ShiftHelper.parseDate(date);
            }
            catch (SvcException e){
                assertEquals("day is invalid", e.getMessage());
            }
        }
        {
            // 2023/13/01 -> error with month
            try{
                final String date = "2023/13/01";
                ShiftHelper.parseDate(date);
            }
            catch (SvcException e){
                assertEquals("month is invalid", e.getMessage());
            }
        }
        {
            // 2023/00/01 -> error with month
            try{
                final String date = "2023/00/01";
                ShiftHelper.parseDate(date);
            }
            catch (SvcException e){
                assertEquals("month is invalid", e.getMessage());
            }
        }
        {
            // 2020/01/01 -> error with year
            try{
                final String date = "2020/01/01";
                ShiftHelper.parseDate(date);
            }
            catch (SvcException e){
                assertEquals("year is invalid", e.getMessage());
            }
        }
    }

    @Test
    public void testCreateShiftHelper(){
        {
            // valid
            try {
                JSONObject shiftHelperJson = JsonTestFactory.getShiftHelperJson();
                ShiftHelper shiftHelper = ModelTestFactory.getShiftHelper();
                ShiftHelper testShiftHelper = new ShiftHelper(shiftHelperJson);
                assertEquals(shiftHelper.getStartDate(), testShiftHelper.getStartDate());
                assertEquals(shiftHelper.getEndDate(), testShiftHelper.getEndDate());
                assertEquals(shiftHelper.getStartHour(), testShiftHelper.getStartHour());
                assertEquals(shiftHelper.getStartMinute(), testShiftHelper.getStartMinute());
                assertEquals(shiftHelper.getEndHour(), testShiftHelper.getEndHour());
                assertEquals(shiftHelper.getEndMinute(), testShiftHelper.getEndMinute());
                assertEquals(shiftHelper.isStartAM(), testShiftHelper.isStartAM());
                assertEquals(shiftHelper.isEndAM(), testShiftHelper.isEndAM());
            }
            catch (SvcException e){
                fail();
            }


        }
    }
}
