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
import org.bson.types.ObjectId;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;
import java.util.List;

import static com.ems.Utils.ResponseUtils.getLocationJSONObjectFromLocation;

public class JSONObjectBuilder {

    public static JSONObject buildJSONObjectFromShift(final Shift pShift) throws JSONException, SvcException {
        JSONObject shiftJSONObj = new JSONObject();

        shiftJSONObj.put("shiftId", pShift.getShiftId());
        final Location location = LocationUtils.getLocationFromShift(pShift);
        JSONObject locationJSONObj = getLocationJSONObjectFromLocation(location);
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
        shiftJSONObj.put("transferEmployeeId", pShift.getTransferEmployeeId());

        return shiftJSONObj;
    }

    public static JSONObject buildJSONFromOrganization(final Organization pOrganization) throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("organizationId", pOrganization.getOrganizationId());
        jsonObject.put("organizationName", pOrganization.getOrganizationName());
        jsonObject.put("orgOwnerEmail", pOrganization.getOrgOwnerEmail());
        jsonObject.put("locationList", buildJSONArrayFromLocationList(pOrganization.getLocationList()));
        jsonObject.put("weeksToReleaseShifts", pOrganization.getWeeksToReleaseShifts());

        return jsonObject;
    }

    public static JSONArray buildJSONArrayFromLocationList(final List<Location> pLocationList) throws JSONException {
        JSONArray jsonArray = new JSONArray();
        for (Location location : pLocationList) {
            JSONObject jsonObject = getLocationJSONObjectFromLocation(location);
            jsonArray.put(jsonObject);
        }
        return jsonArray;
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
        jsonObject.put("locationIdList", buildJSONArrayFromObjectIdList(pEmployee.getLocationIdList()));
        jsonObject.put("shiftIdList", buildJSONArrayFromObjectIdList(pEmployee.getShiftIdList()));

        return jsonObject;

    }

    public static JSONArray buildJSONArrayFromObjectIdList(final List<ObjectId> pObjectIdList){
        JSONArray jsonArray = new JSONArray();
        for(ObjectId objectId : pObjectIdList){
            jsonArray.put(objectId);
        }
        return jsonArray;
    }

}
