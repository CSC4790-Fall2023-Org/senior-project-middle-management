package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.DatabaseUtils;
import com.ems.Utils.JsonUtils;
import com.ems.Utils.LocationUtils;
import com.ems.Utils.ValidationUtils;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

public class LocationServices {

    public static ResponseEntity createLocation(final String pPayload) {
        try{
            final JSONObject jsonObject = new JSONObject(pPayload);
            final ObjectId organizationId = JsonUtils.getOrganizationIdFromJSON(jsonObject);
            Organization organization = DatabaseServices.findOrganizationById(organizationId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationId));

            final JSONObject locationJson = JsonUtils.getLocationJSONFromJSONObject(jsonObject);
            final Location location = new Location(locationJson);

            ValidationServices.validateCreateLocation(organization, location);

            final List<Location> finalLocationList = LocationUtils.addLocationToLocationList(organization.getLocationList(), location);

            organization.setLocationList(finalLocationList);

            DatabaseServices.saveOrganization(organization);
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Location created successfully");}

    public static ResponseEntity deleteLocation(final String pPayload) {
        try{
            final ObjectId locationId = JsonUtils.getLocationIdFromJSON(new JSONObject(pPayload));
            final List<Organization> organizationList = DatabaseServices.getAllOrganizations();


            Organization organization = DatabaseUtils.findOrganizationByLocationId(locationId, organizationList);

            ValidationUtils.validateDeleteLocation(organization, locationId);

            List<Location> finalLocationList = LocationUtils.removeLocationFromLocationList(organization.getLocationList(), locationId);

            organization.setLocationList(finalLocationList);

            DatabaseServices.saveOrganization(organization);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(200).body("Location deleted successfully");
    }
}
