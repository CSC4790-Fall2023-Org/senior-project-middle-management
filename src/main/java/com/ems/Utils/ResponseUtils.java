package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Location;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;

public class ResponseUtils {

    public static JSONObject getLocationListAndShiftTypeListFromManager(final List<String> pShiftTypeList, final List<Location> pLocationList) throws SvcException {
        try {
            JSONObject response = new JSONObject();
            response.put("shiftTypeList" ,pShiftTypeList);
            JSONArray jsonArray = new JSONArray();
            for (Location location : pLocationList) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("locationId", location.getLocationId());
                jsonObject.put("locationName", location.getLocationName());
                jsonArray.put(jsonObject);
            }
            response.put("locationList", jsonArray);
            return response;
        }
        catch (Exception e){
            throw new SvcException("error creating response JSON");
        }
    }
}
