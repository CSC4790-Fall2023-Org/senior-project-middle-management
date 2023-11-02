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
}
