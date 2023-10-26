package com.ems.UtilsTests;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.ValidationUtils;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

public class ValidationUtilsTests {

    @Test
    public void testValidateDate(){
        {
            try{
                // 2023/01/01
                final int year = 2023;
                final int month = 1;
                final int day = 1;
                ValidationUtils.validateDate(year, month, day);
            }
            catch (SvcException e) {
                fail();
            }
        }
        {
            try{
                // 2023/01/32 -> day invalid
                final int year = 2023;
                final int month = 1;
                final int day = 32;
                ValidationUtils.validateDate(year, month, day);
            }
            catch (SvcException e){
                assertEquals("day is invalid", e.getMessage());
            }
        }
        {
            try{
                // 2023/13/01 -> month invalid
                final int year = 2023;
                final int month = 13;
                final int day = 1;
                ValidationUtils.validateDate(year, month, day);
            }
            catch (SvcException e){
                assertEquals("month is invalid", e.getMessage());
            }
        }
        {
            try{
                // 2023/00/01 -> month invalid
                final int year = 2023;
                final int month = 0;
                final int day = 1;
                ValidationUtils.validateDate(year, month, day);
            }
            catch (SvcException e){
                assertEquals("month is invalid", e.getMessage());
            }
        }
        {
            try{
                // 2020/01/01 -> year invalid
                final int year = 2020;
                final int month = 1;
                final int day = 1;
                ValidationUtils.validateDate(year, month, day);
            }
            catch (SvcException e){
                assertEquals("year is invalid", e.getMessage());
            }
        }
    }
}
