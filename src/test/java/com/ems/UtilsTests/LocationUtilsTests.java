package com.ems.UtilsTests;

import com.ems.Utils.LocationUtils;
import com.ems.Utils.OrganizationUtils;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LocationUtilsTests {
    @Test
    public void testAddLocationToLocationList(){
        {
         final Organization organization = OrganizationUtils.getBaseOrganization();
         final Location locationToAdd = new Location(new ObjectId(), "Town Park", 40);

         final List<Location> locationList = LocationUtils.addLocationToLocationList(organization.getLocationList(), locationToAdd);

         assertEquals(2, locationList.size());
        }
    }

    @Test
    public void testRemoveLocationFromLocationList(){
        {
            final Organization organization = OrganizationUtils.getBaseOrganization();
            final List<Location> locationList = LocationUtils.addLocationToLocationList(organization.getLocationList(), new Location(new ObjectId(), "Town Park", 40));
            final ObjectId locationIdToRemove = organization.getLocationList().get(0).getLocationId();

            final List<Location> finalLocationList = LocationUtils.removeLocationFromLocationList(locationList, locationIdToRemove);

            assertEquals(1, finalLocationList.size());
        }
    }
}
