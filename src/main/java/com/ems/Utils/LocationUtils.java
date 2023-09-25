package com.ems.Utils;

import com.ems.database.models.Location;
import org.bson.types.ObjectId;

public class LocationUtils {
    public static Location getBaseLocation(){
        return new Location(
                new ObjectId("6500e97e491cac473a9b80c9"),
                "Town Pool",
                40);
    }
}
