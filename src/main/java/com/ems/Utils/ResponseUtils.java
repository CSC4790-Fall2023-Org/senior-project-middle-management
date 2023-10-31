package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.builders.JSONObjectBuilder;
import com.ems.database.models.Location;
import com.ems.database.models.Manager;
import com.ems.database.models.Shift;
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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

    public static JSONObject getAvailableShiftsResponse(final List<Shift> pShiftList) throws SvcException{
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
}
