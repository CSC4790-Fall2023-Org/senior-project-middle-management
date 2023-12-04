package com.ems.TestFactory;

import com.ems.Utils.LocationUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Shift;
import com.ems.database.models.ShiftHelper;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        shiftHelper.setNumberOfShifts(8);


        return shiftHelper;
    }

    public static Shift getShift(){
        return new Shift(
                new ObjectId("6500e9ec491cac473a9b80cd"),
                LocationUtils.getBaseLocation().getLocationId(),
                "Guard Shift",
                LocalDateTime.of(2023, 8, 20, 10,0),
                LocalDateTime.of(2023, 8, 20, 15,0),
                "Guard",
                true,
                true);
    }

    public static Employee getEmployee(){
        return new Employee(
                new ObjectId("6500e9cc491cac473a9b80cb"),
                "employee",
                "admin",
                "employee@gmail.com",
                "111-111-1111",
                List.of("Guard"),
                20,
                12.50,
                new ObjectId("6500cf35491cac473a9b80c8"),
                List.of(LocationUtils.getBaseLocation().getLocationId()),
                List.of(new ObjectId("6500e9ec491cac473a9b80cd")));
    }


}
