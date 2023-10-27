package com.ems.services;

import com.ems.EmsApplication;
import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.JsonUtils;
import com.ems.database.models.Organization;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import javax.xml.crypto.Data;

public class OrganizationServices {
    public static ResponseEntity createOrganization(final String pPayload) {
        try {
            Organization organization = new Organization(new JSONObject(pPayload));
            ValidationServices.validateCreateOrganization(organization);
            DatabaseServices.saveOrganization(organization);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Organization created successfully");
    }

    public static ResponseEntity deleteOrganization(final String pPayload) {
        try {
            ObjectId organizationId;

            organizationId = JsonUtils.getOrganizationIdFromJSON(new JSONObject(pPayload));
            Organization organization = DatabaseServices.findOrganizationById(organizationId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationId));

            ValidationServices.validateDeleteOrganization(organization);

            DatabaseServices.deleteOrganization(organization);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Organization deleted successfully");
    }
}