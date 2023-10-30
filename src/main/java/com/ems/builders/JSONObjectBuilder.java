package com.ems.builders;

import com.ems.Utils.DateUtils;
import com.ems.database.models.Shift;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

public class JSONObjectBuilder {

    public static JSONObject buildJSONObjectFromShift(final Shift pShift) throws JSONException {
        JSONObject shiftJSONObj = new JSONObject();

        shiftJSONObj.put("shiftId", pShift.getShiftId());
        shiftJSONObj.put("location","" );
        shiftJSONObj.put("shiftName", pShift.getShiftName());
        shiftJSONObj.put("shiftStartDate", DateUtils.getCorrectDateFormatFromLocalDateTime(pShift.getShiftStartTime()));
        shiftJSONObj.put("shiftStartTime", DateUtils.getCorrectTimeFromLocalDateTime(pShift.getShiftStartTime()));
        shiftJSONObj.put("shiftEndTime", DateUtils.getCorrectTimeFromLocalDateTime(pShift.getShiftEndTime()));
        shiftJSONObj.put("shiftHours", DateUtils.getHoursBetweenShifts(pShift.getShiftStartTime(), pShift.getShiftEndTime()));
        shiftJSONObj.put("shiftType", pShift.getShiftType());
        shiftJSONObj.put("isShiftOpen", pShift.isShiftOpen());
        shiftJSONObj.put("isDropApproved", pShift.isDropApproved());

        return shiftJSONObj;
    }
}
