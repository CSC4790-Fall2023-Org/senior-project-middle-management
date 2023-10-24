package com.ems.TestFactory;

import com.ems.database.models.ShiftHelper;

import java.time.LocalDate;

public class ModelTestFactory {
    public static ShiftHelper getShiftHelper(){
        ShiftHelper shiftHelper = new ShiftHelper();
        shiftHelper.setStartDate(LocalDate.of(2023, 1, 1));
        shiftHelper.setEndDate(LocalDate.of(2023, 1, 31));
        shiftHelper.setStartHour(10);
        shiftHelper.setStartMinute(0);
        shiftHelper.setStartAM(true);
        shiftHelper.setEndHour(15);
        shiftHelper.setEndMinute(0);
        shiftHelper.setEndAM(false);
        return shiftHelper;
    }

}
