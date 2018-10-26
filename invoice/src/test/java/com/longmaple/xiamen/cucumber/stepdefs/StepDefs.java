package com.longmaple.xiamen.cucumber.stepdefs;

import com.longmaple.xiamen.InvoiceApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = InvoiceApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
