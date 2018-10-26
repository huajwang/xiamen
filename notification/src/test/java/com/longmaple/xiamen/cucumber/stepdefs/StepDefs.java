package com.longmaple.xiamen.cucumber.stepdefs;

import com.longmaple.xiamen.NotificationApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = NotificationApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
