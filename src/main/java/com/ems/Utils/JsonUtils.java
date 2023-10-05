package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import com.ems.database.models.Location;
import com.ems.database.models.Manager;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
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
            return new ObjectId((String) pJsonObject.get("organizationId"));
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

    public static List<Location> getLocationListFromJSON(final JSONArray pJsonArray) throws JSONException {
        List<Location> result = new ArrayList<>();

        for (int index = 0; index < pJsonArray.length(); index++){
            result.add(new Location((JSONObject) pJsonArray.get(index)));
        }
        return result;
    }
}