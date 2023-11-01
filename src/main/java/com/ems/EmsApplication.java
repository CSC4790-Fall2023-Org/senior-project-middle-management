package com.ems;

import com.ems.database.models.*;
import com.ems.database.repositories.*;
import com.ems.setup.Setup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmsApplication implements CommandLineRunner {

    public OrganizationRepository organizationRepository;
    public EmployeeRepository employeeRepository;
    public ManagerRepository managerRepository;
    public ShiftRepository shiftRepository;

    public static OrganizationRepository visibleOrganizationRepository;
    public static EmployeeRepository visibleEmployeeRepository;
    public static ManagerRepository visibleManagerRepository;
    public static ShiftRepository visibleShiftRepository;

    @Autowired
    void AppApplication(final OrganizationRepository organizationRepository, final EmployeeRepository employeeRepository, final ManagerRepository managerRepository, final ShiftRepository shiftRepository){
        this.organizationRepository = organizationRepository;
        this.employeeRepository = employeeRepository;
        this.managerRepository = managerRepository;
        this.shiftRepository = shiftRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EmsApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        System.out.println("APPLICATION STARTED");

        visibleOrganizationRepository = organizationRepository;
        visibleEmployeeRepository = employeeRepository;
        visibleManagerRepository = managerRepository;
        visibleShiftRepository = shiftRepository;

        // run demo setup
        Setup.runSetup();
    }
}
