package com.lcm.web.main.service;


import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lcm.web.main.dao.MainDAO;

@Service
public class MainService {
	
	@Autowired
	private MainDAO mainDAO;
	
	public void insertLocation(HashMap<String, Object> param) {
		mainDAO.insertLocation(param);
	}
	
	public HashMap<String, Object> getLocation(HashMap<String, Object> param) {
		return mainDAO.getLocation(param);
	}
}
