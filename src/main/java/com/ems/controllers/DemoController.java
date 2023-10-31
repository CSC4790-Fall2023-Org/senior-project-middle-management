package com.ems.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {


    @PostMapping("/clearDatabase")
    public ResponseEntity clearDatabase() {




        return ResponseEntity.ok("Database Cleared");
    }
}
