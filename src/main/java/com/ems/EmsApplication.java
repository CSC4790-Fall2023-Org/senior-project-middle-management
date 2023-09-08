package com.ems;

import com.ems.database.Organization;
import com.ems.database.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmsApplication implements CommandLineRunner {

    public OrganizationRepository organizationRepository;


    @Autowired
    void AppApplication(final OrganizationRepository organizationRepository){
        this.organizationRepository = organizationRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(EmsApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        System.out.println("Hello World!");



        for (Organization organization : organizationRepository.findAll()) {
            System.out.println(organization.getOrganizationId());
        }
    }
}
