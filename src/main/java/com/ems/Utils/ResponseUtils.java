package com.ems.Utils;

import com.ems.Exceptions.SvcException;
import com.ems.database.models.Location;
import com.ems.database.models.Manager;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.cglib.core.Local;

import java.util.List;

public class ResponseUtils {

    public static JSONObject getLocationIdListAndShiftTypeListFromManager(final List<String> pShiftTypeList, final List<Location> pLocationList) throws SvcException {
        try {
            JSONObject response = new JSONObject();
            response.put("shiftTypeList" ,pShiftTypeList);
            response.put("locationIdList", pLocationList);
            return response;
        }
        catch (Exception e){
            throw new SvcException("error creating response JSON");
        }

    }
}
