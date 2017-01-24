package com.lcm.web.main.controller;

import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.lcm.web.main.service.MainService;

@Controller
public class MainController {
	private Logger log = Logger.getLogger(this.getClass());
	
	@Autowired
	private MainService mainService;
	
	@RequestMapping(value = "/main.do")
	public String main(@RequestParam HashMap<String, Object> param
							,ModelMap model) {
		
		param.put("id", "almond");
		HashMap<String, Object> location = mainService.getLocation(param);
		
		model.addAttribute("location", location);
		
		return "main/main";
	}
	
	@RequestMapping(value = "/insertLocation.do")
	public ModelAndView insertLocation(@RequestParam HashMap<String, Object> param) {
		ModelAndView mv = new ModelAndView("main/main");
		
		System.out.println(param);
		
		return mv;
	}
	
	@RequestMapping(value = "/getLocation.do")
	public String getLocation(@RequestParam HashMap<String, Object> param,
									ModelMap model) {
		
		System.out.println(param);
		
		HashMap<String, Object> location = mainService.getLocation(param);
		
		model.addAttribute("location", location);
		
		return "jsonView";
	}
}
