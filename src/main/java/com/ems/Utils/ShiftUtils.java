package com.ems.Utils;

import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import java.time.LocalDateTime;

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
}
