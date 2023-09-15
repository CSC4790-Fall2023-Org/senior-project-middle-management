package com.ems;

import com.ems.database.models.*;
import com.ems.database.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmsApplication implements CommandLineRunner {

    public OrganizationRepository organizationRepository;
    public EmployeeRepository employeeRepository;
    public ManagerRepository managerRepository;
    public LocationRepository locationRepository;
    public ShiftRepository shiftRepository;

    public static OrganizationRepository visableOrganizationRepository;
    public static EmployeeRepository visableEmployeeRepository;
    public static ManagerRepository visableManagerRepository;
    public static LocationRepository visableLocationRepository;
    public static ShiftRepository visableShiftRepository;

    @Autowired
    void AppApplication(final OrganizationRepository organizationRepository, final EmployeeRepository employeeRepository, final ManagerRepository managerRepository, final LocationRepository locationRepository, final ShiftRepository shiftRepository){
        this.organizationRepository = organizationRepository;
        this.employeeRepository = employeeRepository;
        this.managerRepository = managerRepository;
        this.locationRepository = locationRepository;
        this.shiftRepository = shiftRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EmsApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        System.out.println("APPLICATION STARTED");

        visableOrganizationRepository = organizationRepository;
        visableEmployeeRepository = employeeRepository;
        visableManagerRepository = managerRepository;
        visableLocationRepository = locationRepository;
        visableShiftRepository = shiftRepository;

        for (Organization organization : organizationRepository.findAll()) {
            System.out.println(organization.getOrganizationId());
        }

        for (Location location : locationRepository.findAll()) {
            System.out.println(location.getLocationId());
        }

        for (Employee employee : employeeRepository.findAll()) {
            System.out.println(employee.getEmployeeId());
        }

        for (Manager manager : managerRepository.findAll()) {
            System.out.println(manager.getManagerId());
        }

        for (Shift shift : shiftRepository.findAll()) {
            System.out.println(shift.getShiftId());
        }
    }
}
