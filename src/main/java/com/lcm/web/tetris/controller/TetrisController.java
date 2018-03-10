package com.lcm.web.tetris.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.lcm.web.tetris.service.TetrisService;
import com.lcm.web.tetris.vo.Tetris;

@Controller
public class TetrisController {
	private Logger log = Logger.getLogger(this.getClass());
	
	@Autowired
	private TetrisService tetrisService;
	
	@RequestMapping(value = "/tetris.do")
	public String main(@RequestParam HashMap<String, Object> param
							,ModelMap model) {
		
		ArrayList<Tetris> list = tetrisService.getScore();
		
		model.addAttribute("list", list);
		
		return "tetris/index";
	}
	
	@RequestMapping(value = "/score.do", method = RequestMethod.POST)
	public String insertScore(@RequestParam HashMap<String, Object> param
							 ,HttpServletRequest request
							 ,Model model) {

		param.put("ipAddress", request.getRemoteAddr().toString());
		int result = tetrisService.insertScore(param);
		
		model.addAttribute("result", result);
		
		return "jsonView";
	}
	
	@RequestMapping(value = "/score.do", method = RequestMethod.GET)
	public String getScore(@RequestParam HashMap<String, Object> param
							 ,Model model) {
		
		ArrayList<Tetris> list = tetrisService.getScore();
		
		model.addAttribute("list", list);
		
		return "jsonView";
	}
}
