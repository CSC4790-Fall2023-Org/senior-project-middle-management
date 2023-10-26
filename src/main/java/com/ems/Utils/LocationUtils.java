package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.stream.Collectors;

public class LocationUtils {
    public static Location getBaseLocation(){
        return new Location(
                new ObjectId("6500e97e491cac473a9b80c9"),
                "Town Pool",
                40);
    }

    public static Location getLocationFromLocationId(final ObjectId pLocationId, final Organization pOrganization) throws SvcException {
        return pOrganization.getLocationList().stream()
                .filter(location -> location.getLocationId().equals(pLocationId)).findFirst()
                .orElseThrow(() -> new SvcException("error getting location from organization"));
    }

    public static List<Location> getLocationListFromLocationIdList(final List<ObjectId> pLocationIdList, final Organization pOrganization) throws SvcException {
        return pLocationIdList.stream()
                .map(locationId -> {
                    try {
                        return getLocationFromLocationId(locationId, pOrganization);
                    } catch (SvcException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }
}
