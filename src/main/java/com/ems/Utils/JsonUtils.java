package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Employee;
import org.bson.types.ObjectId;
import org.json.JSONObject;

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


    public static ObjectId getOrganizationIdFromJSON(final JSONObject pJsonObject) throws SvcException {
        try{
            return new ObjectId((String) pJsonObject.get("organizationId"));
        }
        catch (Exception e){
            e.printStackTrace();
            throw new SvcException("Error getting organizationId from JSON");
        }
    }
}
