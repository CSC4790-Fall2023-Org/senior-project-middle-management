package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.builders.JSONObjectBuilder;
import com.ems.database.models.Location;
import com.ems.database.models.Shift;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class ResponseUtils {

    public static JSONObject getLocationListAndShiftTypeListFromManager(final List<String> pShiftTypeList, final List<Location> pLocationList) throws SvcException {
        try {
            JSONObject response = new JSONObject();
            response.put("shiftTypeList" ,pShiftTypeList);
            JSONArray jsonArray = getLocationJSONFromLocationList(pLocationList);
            response.put("locationList", jsonArray);
            return response;
        }
        catch (Exception e){
            throw new SvcException("error creating response JSON");
        }
    }

    public static JSONObject getShiftsResponse(final List<Shift> pShiftList) throws SvcException{
        try{
            JSONObject response = new JSONObject();
            JSONArray jsonArray = new JSONArray();
            for (Shift shift : pShiftList){
                JSONObject currentShift = JSONObjectBuilder.buildJSONObjectFromShift(shift);
                jsonArray.put(currentShift);
            }
            response.put("shiftList", jsonArray);
            return response;
        }
        catch (Exception e){
            throw new SvcException("error creating response JSON");
        }
    }

    public static JSONArray getLocationJSONFromLocationList(final List<Location> pLocationList) throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (Location location : pLocationList) {
            JSONObject jsonObject = getLocationJSONObjectFromLocation(location);
            jsonArray.put(jsonObject);
        }
        return jsonArray;
    }

    public static JSONObject getLocationJSONObjectFromLocation(final Location pLocation) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("locationId", pLocation.getLocationId());
        jsonObject.put("locationName", pLocation.getLocationName());
        return jsonObject;
    }

    public static ResponseEntity errorResponse(final Exception pException) {
        try {
            pException.printStackTrace();
            JSONObject responses = new JSONObject();
            responses.put("message", pException.getMessage());
            return ResponseEntity.status(400).body(responses.toString());
        } catch (JSONException ex) {
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }

    public static ResponseEntity successfulResponse(final String pMessage){
        try {
            JSONObject responses = new JSONObject();
            responses.put("message", pMessage);
            return ResponseEntity.status(200).body(responses.toString());
        } catch (JSONException ex) {
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }

    public static ResponseEntity successfulCreationResponse(final String pMessage){
        try {
            JSONObject responses = new JSONObject();
            responses.put("message", pMessage);
            return ResponseEntity.status(200).body(responses.toString());
        } catch (JSONException ex) {
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }

    public static ResponseEntity getAllResponse(final String pMessageType, final JSONArray pJSONArray){
        try {
            JSONObject responses = new JSONObject();
            responses.put(pMessageType, pJSONArray);
            return ResponseEntity.status(200).body(responses.toString());
        } catch (JSONException ex) {
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }

    public static ResponseEntity getOrganizationInfo(final JSONObject pJsonObject){
        try {
            JSONObject responses = new JSONObject();
            responses.put("organizationInfo", pJsonObject);
            return ResponseEntity.status(200).body(responses.toString());
        } catch (JSONException ex) {
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }

    public static ResponseEntity getEmployeeInfo(final JSONObject pJsonObject){
        try {
            JSONObject responses = new JSONObject();
            responses.put("employeeInfo", pJsonObject);
            return ResponseEntity.status(200).body(responses.toString());
        } catch (JSONException ex) {
            return ResponseEntity.status(400).body("{\"message\": \"error creating response JSON\"}");
        }
    }
}
