package com.ems.builders;

import com.ems.database.models.Shift;
import org.json.JSONException;
import org.json.JSONObject;

public class JSONObjectBuilder {

    public static JSONObject buildJSONObjectFromShift(final Shift pShift) throws JSONException {
        JSONObject shiftJSONObj = new JSONObject();

        shiftJSONObj.put("shiftId", pShift.getShiftId());
        shiftJSONObj.put("locationId", pShift.getLocationId());
        shiftJSONObj.put("shiftName", pShift.getShiftName());
        shiftJSONObj.put("shiftStartTime", pShift.getShiftStartTime());
        shiftJSONObj.put("shiftEndTime", pShift.getShiftEndTime());
        shiftJSONObj.put("shiftType", pShift.getShiftType());
        shiftJSONObj.put("isShiftOpen", pShift.isShiftOpen());
        shiftJSONObj.put("isDropApproved", pShift.isDropApproved());

        return shiftJSONObj;
    }
}
