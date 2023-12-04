package com.ems.setup;

import com.ems.Utils.ShiftUtils;
import com.ems.database.models.Shift;
import com.ems.database.models.ShiftHelper;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class DemoShifts {
        static ShiftHelper DEMO_SHIFT_HELPER_1 = new ShiftHelper(
            LocalDate.of(LocalDate.now().getYear(),LocalDate.now().getMonth(),LocalDate.now().getDayOfMonth()),
            LocalDate.of(LocalDate.now().plusWeeks(4).getYear(),LocalDate.now().plusWeeks(4).getMonth(),LocalDate.now().plusWeeks(4).getDayOfMonth()),
            10,
            0,
            true,
            15,
            0,
            false,
            "Morning Guard",
                DemoEmployees.DEMO_EMPLOYEE_ONE.getEmployeeTypes().toString(),
            1,
            List.of(1, 3, 5),
            DemoOrganizations.DEMO_ORG_ONE.getLocationList().get(0).getLocationId(),
            8);


    public static List<ShiftHelper> createShiftHelperList(){
        return List.of(DEMO_SHIFT_HELPER_1);
    }


    public static List<Shift> createDemoShiftList(){
        List<Shift> result = new ArrayList<>();
        for (ShiftHelper shiftHelper : createShiftHelperList()){
            List<Shift> shiftList = ShiftUtils.createShifts(shiftHelper);
            result.addAll(shiftList);
        }
        return result;
    }


}
