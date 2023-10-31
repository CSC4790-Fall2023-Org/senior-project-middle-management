package com.ems.builders;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.DateUtils;
import com.ems.Utils.LocationUtils;
import com.ems.Utils.ResponseUtils;
import com.ems.database.models.Location;
import com.ems.database.models.Organization;
import com.ems.database.models.Shift;
import com.ems.services.DatabaseServices;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

public class JSONObjectBuilder {

    public static JSONObject buildJSONObjectFromShift(final Shift pShift) throws JSONException, SvcException {
        JSONObject shiftJSONObj = new JSONObject();

        shiftJSONObj.put("shiftId", pShift.getShiftId());
        final Location location = LocationUtils.getLocationFromShift(pShift);
        JSONObject locationJSONObj = ResponseUtils.getLocationJSONObjectFromLocation(location);
        shiftJSONObj.put("location", locationJSONObj);
        shiftJSONObj.put("shiftName", pShift.getShiftName());
        shiftJSONObj.put("shiftStartDate", DateUtils.getCorrectDateFormatFromLocalDateTime(pShift.getShiftStartTime()));
        shiftJSONObj.put("shiftEndDate", DateUtils.getCorrectDateFormatFromLocalDateTime(pShift.getShiftEndTime()));
        shiftJSONObj.put("shiftStartTime", DateUtils.convertFromMilitaryTimeToUsable(pShift.getShiftStartTime()));
        shiftJSONObj.put("shiftEndTime", DateUtils.convertFromMilitaryTimeToUsable(pShift.getShiftEndTime()));
        shiftJSONObj.put("shiftHours", DateUtils.getHoursBetweenShifts(pShift.getShiftStartTime(), pShift.getShiftEndTime()));
        shiftJSONObj.put("shiftType", pShift.getShiftType());
        shiftJSONObj.put("isShiftOpen", pShift.isShiftOpen());
        shiftJSONObj.put("isDropApproved", pShift.isDropApproved());

        return shiftJSONObj;
    }
}
