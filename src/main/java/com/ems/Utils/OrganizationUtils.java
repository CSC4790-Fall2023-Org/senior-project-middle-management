package com.ems.Utils;

import com.ems.database.models.Employee;
import com.ems.database.models.Organization;
import com.ems.database.models.Location;
import com.ems.services.DatabaseServices;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class OrganizationUtils {

    public static Organization getBaseOrganization(){
        return new Organization(
                new ObjectId("6500cf35491cac473a9b80c8"),
                "Town Park",
                "townpark@gmail.com",
                List.of(LocationUtils.getBaseLocation()),
                2);
    }

    public static boolean doOrganizationsMatch(final Organization organization, final Organization pComparisonOrganization) {
        return organization.getOrganizationName().equals(pComparisonOrganization.getOrganizationName())
                && organization.getOrgOwnerEmail().equals(pComparisonOrganization.getOrgOwnerEmail())
                && doLocationListsMatch(organization.getLocationList(), pComparisonOrganization.getLocationList());
    }

    private static boolean doLocationListsMatch(List<Location> locationList1, List<Location> locationList2) {
        if (locationList1.size() != locationList2.size()) {
            return false;
        }

        for(int i = 0; i < locationList1.size(); i++) {
            Location location1 = locationList1.get(i);
            Location location2 = locationList2.get(i);

            if (!location1.getLocationName().equals(location2.getLocationName())) {
                return false;
            }
        }
        return true;
    }

    public static List<Employee> getAllEmployeesForOrganization(final Organization pOrganization, final List<Employee> pEmployeeList){
        return pEmployeeList.stream()
                .filter(employee -> employee.getOrganizationId().equals(pOrganization.getOrganizationId()))
                .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }
}
