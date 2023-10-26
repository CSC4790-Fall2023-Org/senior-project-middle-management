package com.ems.UtilsTests;

import com.ems.Exceptions.SvcException;
import com.ems.TestFactory.ModelTestFactory;
import com.ems.Utils.EmployeeUtils;
import com.ems.Utils.ValidationUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

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

    @Test
    public void testValidateShiftForEmployee (){

        {
            // shift is valid
            Shift shift = ModelTestFactory.getShift();
            final Employee employee = EmployeeUtils.getBaseEmployee();
            final int weeksToRelease = 2;
            shift.setShiftStartTime(LocalDate.now().atTime(10,0).plusWeeks(1));
            boolean isValid = ValidationUtils.validateShiftForEmployee(shift, employee, weeksToRelease);
            assertTrue(isValid);
        }
        {
            // shift is invalid -> ids not the same
            Shift shift = ModelTestFactory.getShift();
            final Employee employee = EmployeeUtils.getBaseEmployee();
            employee.setEmployeeId(new ObjectId());
            final int weeksToRelease = 2;
            shift.setShiftStartTime(LocalDate.now().atTime(10,0).plusWeeks(1));
            boolean isValid = ValidationUtils.validateShiftForEmployee(shift, employee, weeksToRelease);
            assertFalse(isValid);
        }
        {
            // shift is invalid -> too many weeks away
            Shift shift = ModelTestFactory.getShift();
            final Employee employee = EmployeeUtils.getBaseEmployee();
            final int weeksToRelease = 2;
            shift.setShiftStartTime(LocalDate.now().atTime(10,0).plusWeeks(3));
            boolean isValid = ValidationUtils.validateShiftForEmployee(shift, employee, weeksToRelease);
            assertFalse(isValid);
        }
        {
            // shift is invalid -> shift is not open
            Shift shift = ModelTestFactory.getShift();
            final Employee employee = EmployeeUtils.getBaseEmployee();
            final int weeksToRelease = 2;
            shift.setShiftStartTime(LocalDate.now().atTime(10,0).minusWeeks(1));
            shift.setShiftOpen(false);
            boolean isValid = ValidationUtils.validateShiftForEmployee(shift, employee, weeksToRelease);
            assertFalse(isValid);
        }
    }
}
