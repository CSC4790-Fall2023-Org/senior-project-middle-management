package com.ems.Utils;

import com.ems.database.models.ShiftDate;

public class TestUtils {

    public static ShiftDate getBaseShiftDate(){
        ShiftDate shiftDate = new ShiftDate();
        shiftDate.setStartYear(2023);
        shiftDate.setStartMonth(5);
        shiftDate.setStartDay(1);
        shiftDate.setEndYear(2023);
        shiftDate.setEndMonth(9);
        shiftDate.setEndDay(1);
        shiftDate.setStartHour(10);
        shiftDate.setStartMinute(0);
        shiftDate.setStartAM(true);
        shiftDate.setEndHour(15);
        shiftDate.setEndMinute(0);
        shiftDate.setEndAM(false);
        return shiftDate;
    }
}
