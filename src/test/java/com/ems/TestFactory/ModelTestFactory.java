package com.ems.TestFactory;

import com.ems.database.models.ShiftHelper;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.List;

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
        shiftHelper.setShiftName("Morning Guard");
        shiftHelper.setShiftType("Guard");
        shiftHelper.setRepeatsEvery(1);
        shiftHelper.setDaysOfWeek(List.of(1, 3, 5));
        shiftHelper.setLocationId(new ObjectId("6500e9ec491cac473a9b80cd"));


        return shiftHelper;
    }

}
