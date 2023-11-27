package com.ems.builders;

import com.ems.Exceptions.SvcException;
import com.ems.Utils.DateUtils;
import com.ems.Utils.LocationUtils;
import com.ems.Utils.ResponseUtils;
import com.ems.database.models.Employee;
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

    public static JSONObject buildJSONObjectFromEmployee(final Employee pEmployee) throws JSONException {

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("employeeId", pEmployee.getEmployeeId());
        jsonObject.put("firstName", pEmployee.getFirstName());
        jsonObject.put("lastName", pEmployee.getLastName());
        jsonObject.put("employeeEmail", pEmployee.getEmployeeEmail());
        jsonObject.put("employeePhoneNumber", pEmployee.getEmployeePhoneNumber());
        jsonObject.put("employeeType", pEmployee.getEmployeeType());
        jsonObject.put("loggedHours", pEmployee.getLoggedHours());
        jsonObject.put("pay", pEmployee.getPay());
        jsonObject.put("organizationId", pEmployee.getOrganizationId());
        jsonObject.put("locationIdList", pEmployee.getLocationIdList());
        jsonObject.put("shiftIdList", pEmployee.getShiftIdList());
        return jsonObject;


    }
}
