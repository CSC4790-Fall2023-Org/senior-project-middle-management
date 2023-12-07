package com.ems.services;

import com.ems.EmsApplication;
import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.EmployeeUtils;
import com.ems.Utils.JsonUtils;
import com.ems.Utils.OrganizationUtils;
import com.ems.Utils.ResponseUtils;
import com.ems.builders.JSONObjectBuilder;
import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import org.apache.coyote.Response;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import javax.xml.crypto.Data;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

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
            final ObjectId organizationId = JsonUtils.getOrganizationIdFromJSON(new JSONObject(pPayload));
            final Organization organization = DatabaseServices.findOrganizationById(organizationId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationId));

            ValidationServices.validateDeleteOrganization(organization);

            DatabaseServices.deleteOrganization(organization);

        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
        return ResponseEntity.status(200).body("Organization deleted successfully");
    }

    public static ResponseEntity getAllEmployees(final String pPayload){
        try{
            final ObjectId organizationId = JsonUtils.getOrganizationIdFromJSON(new JSONObject(pPayload));
            final Organization organization = DatabaseServices.findOrganizationById(organizationId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationId));
            final List<Employee> employeeList = EmployeeUtils.getAllEmployeesForOrganization(organization, DatabaseServices.getAllEmployees());
            final JSONArray responseArray = JsonUtils.getJSONArrayFromEmployeeList(employeeList);

            return ResponseUtils.getAllResponse("employeeList", responseArray);


        }
        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    public static ResponseEntity getOrganizationInfo(final String pPayload) {
        try{
            final JSONObject payload = new JSONObject(pPayload);
            final ObjectId organizationId = JsonUtils.getOrganizationIdFromJSON(payload);
            final Organization organization = DatabaseServices.findOrganizationById(organizationId)
                    .orElseThrow(() -> new DatabaseException(DatabaseException.LOCATING_ORGANIZATION, organizationId));

            final JSONObject response = JSONObjectBuilder.buildJSONFromOrganization(organization);

            return ResponseUtils.getOrganizationInfo(response);

        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}