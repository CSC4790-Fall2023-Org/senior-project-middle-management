package com.ems.setup;

import com.ems.Exceptions.DatabaseException;
import com.ems.Exceptions.SvcException;
import com.ems.Utils.DatabaseUtils;
import com.ems.database.models.Employee;
import com.ems.database.models.Manager;

import java.util.List;

public class Setup {

    public static void runSetup() {
        System.out.println("STARTING SETUP");

        // database clearing
        if (SetupFields.CLEAR_ALL_DATABASES) {
            System.out.println("STARTING CLEARING DATABASES");
            DatabaseUtils.clearAllDatabases();
        } else {
            try {
                if (SetupFields.CLEAR_ALL_EMPLOYEES) {
                    System.out.println("STARTING CLEARING EMPLOYEES");
                    DatabaseUtils.deleteAllEmployees();
                }
                if (SetupFields.CLEAR_ALL_MANAGERS) {
                    System.out.println("STARTING CLEARING MANAGERS");
                    DatabaseUtils.deleteAllManagers();
                }
                if (SetupFields.CLEAR_ALL_ORGANIZATIONS) {
                    System.out.println("STARTING CLEARING MANAGERS");
                    DatabaseUtils.deleteAllOrganizations();
                }
                if (SetupFields.CLEAR_ALL_SHIFTS) {
                    System.out.println("STARTING CLEARING MANAGERS");
                    DatabaseUtils.deleteAllShifts();
                }
            } catch (DatabaseException e) {
                throw new RuntimeException(e);
            }
        }



        // database creation
        if (SetupFields.CREATE_EMPLOYEES) {
            System.out.println("STARTING CREATING EMPLOYEES");
            List<Employee> employees = DemoEmployees.createDemoEmployeeList();
            try {
                DatabaseUtils.saveEmployeesFromList(employees);
            } catch (SvcException e) {
                e.printStackTrace();
            }
        }

        if (SetupFields.CREATE_MANAGERS) {
            System.out.println("STARTING CREATING MANAGERS");
            List<Manager> managers = DemoManagers.createDemoManagerList();
            try {
                DatabaseUtils.saveManagersFromList(managers);
            } catch (SvcException e) {
                e.printStackTrace();
            }
        }

        if (SetupFields.CREATE_ORGANIZATIONS) {
            System.out.println("STARTING CREATING ORGANIZATIONS");
            List<com.ems.database.models.Organization> organizations = DemoOrganizations.createDemoOrganizationList();
            try {
                DatabaseUtils.saveOrganizationsFromList(organizations);
            } catch (SvcException e) {
                e.printStackTrace();
            }
        }

        if (SetupFields.CREATE_SHIFTS) {
            System.out.println("STARTING CREATING SHIFTS");
            List<com.ems.database.models.Shift> shifts = DemoShifts.createDemoShiftList();
            try {
                DatabaseUtils.saveShiftsFromList(shifts);
            } catch (SvcException e) {
                e.printStackTrace();
            }
        }
        System.out.println("ENDING SETUP");
    }
}
