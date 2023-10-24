package com.ems.Utils;

import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ShiftUtils {
    public static Shift getBaseShift(){
        return new Shift(
                new ObjectId("6500e9ec491cac473a9b80cd"),
                LocationUtils.getBaseLocation().getLocationId(),
                "Guard Shift",
                LocalDateTime.of(2023, 8, 20, 10,0),
                LocalDateTime.of(2023, 8, 20, 18,0),
                "Guard",
                true);
    }


    public static List<LocalDate> getDatesBetweenTwoDates(final LocalDate pStartDate, final LocalDate pEndDate){
        List<LocalDate> dates = new ArrayList<>();

        for (LocalDate date = pStartDate; date.isBefore(pEndDate); date = date.plusDays(1)){
            dates.add(date);
        }
        dates.add(pEndDate);
        return dates;
    }
}
