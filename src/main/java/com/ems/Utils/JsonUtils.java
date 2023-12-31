package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.builders.JSONObjectBuilder;
import com.ems.database.models.Employee;
import com.ems.database.models.Manager;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class JsonUtils {

    public static Employee getEmployeeFromJSON(final JSONObject pJsonObject) throws SvcException {
        try{
            return new Employee(pJsonObject);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error creating user from JSON");
        }
    }

    public static Manager getManagerFromJSON(final JSONObject pJsonObject) throws SvcException {
        try {
            return new Manager(pJsonObject);
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new SvcException("Error creating manager from JSON");
        }
    }


    public static ObjectId getOrganizationIdFromJSON(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId(pJsonObject.getString("organizationId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting organizationId from JSON");
        }
    }

    public static ObjectId getEmployeeIdFromJSON(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId((String) pJsonObject.get("employeeId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting employeeId from JSON");
        }
    }

    public static ObjectId getShiftIdFromJSON(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId((String) pJsonObject.get("shiftId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting shiftId from JSON");
        }
    }

    public static ObjectId getManagerIdFromJSON(final JSONObject pJsonObject) throws SvcException {
        try {
            return new ObjectId((String) pJsonObject.get("managerId"));
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new SvcException("Error getting managerId from JSON");
        }
    }

    public static Object[] getShiftFromJSON(final JSONObject pJsonObject) throws SvcException {
        try {
            // todo: need to work out how best to deal with days and times
            return new Object[] {new Shift(pJsonObject), pJsonObject.get("occurrences")};
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting shift from JSON");
        }
    }

    public static List<ObjectId> getLocationIdListFromJson(final JSONArray pJsonArray) throws SvcException {
        try{
            List<ObjectId> result = new ArrayList<>();
            for (int i = 0; i < pJsonArray.length(); i++){
                result.add(new ObjectId((String) pJsonArray.get(i)));
            }
            return result;
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting locationIdList from JSON");
        }

    }

    public static List<String> getShiftTypeListFromJSON(final JSONArray pJsonArray) throws SvcException{
        try{
            List<String> result = new ArrayList<>();
            for (int i = 0; i < pJsonArray.length(); i++){
                result.add(pJsonArray.getString(i));
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SvcException("Error getting shift type list from JSON");

        }
    }

    public static List<Integer> convertJsonArrayToListInteger(final JSONArray pJsonArray) throws JSONException {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < pJsonArray.length(); i++) {
            result.add((Integer) pJsonArray.get(i));
        }
        return result;
    }

    public static JSONObject getLocationJSONFromJSONObject(final JSONObject pJsonObject) throws SvcException {
        try{
            return pJsonObject.getJSONObject("location");
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting location JSON from JSON");
        }
    }

    public static ObjectId getLocationIdFromJSON(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId(pJsonObject.getString("locationId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting locationId from JSON");
        }
    }

    public static JSONObject createJsonObject(final String pPayload) throws SvcException {
        try{
            return new JSONObject(pPayload);
        } catch (JSONException e) {
            throw new SvcException("error creating json object from request string");
        }
    }

    public static JSONArray getJSONArrayFromEmployeeList(final List<Employee> pEmployeeList) throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (Employee employee : pEmployeeList){
            JSONObject currentEmployeeObject = JSONObjectBuilder.buildJSONObjectFromEmployee(employee);
            jsonArray.put(currentEmployeeObject);
        }
        return jsonArray;
    }


    public static ObjectId getTransferTargetEmployeeId(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId(pJsonObject.getString("targetEmployeeId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting targetEmployeeId from JSON");
        }
    }

    public static ObjectId getTransferSourceEmployeeId(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId(pJsonObject.getString("sourceEmployeeId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting transferSourceEmployeeId from JSON");
        }
    }
}