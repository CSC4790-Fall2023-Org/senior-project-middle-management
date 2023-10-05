package com.ems.services;

import com.ems.Exceptions.DatabaseException;
import com.ems.database.models.Organization;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

public class OrganizationServices {
    public static ResponseEntity createOrganization(final String pPayload) {
        try{
            Organization organization = new Organization(new JSONObject(pPayload));

            DatabaseServices.saveOrganization(organization);

        } catch (JSONException | DatabaseException e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Organization saved successfully");
    }
}
