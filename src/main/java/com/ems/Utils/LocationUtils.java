package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;
import org.bson.types.ObjectId;

import java.util.ArrayList;
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

    public static Location getLocationFromShift(final Shift pShift) throws SvcException {
        final List<Organization> organizationList = DatabaseServices.getAllOrganizations();
        for (Organization organization : organizationList){
            for (Location location : organization.getLocationList()){
                if (location.getLocationId().equals(pShift.getLocationId())){
                    return location;
                }
            }
        }
        throw new SvcException("error finding location");
    }

    public static List<Location> addLocationToLocationList(List<Location> pCurrentLocationList, final Location pLocationToAdd){
        ArrayList<Location> locationList = new ArrayList<>(pCurrentLocationList);
        locationList.add(pLocationToAdd);

        return locationList;
    }
}
