package com.lcm.web.tetris.service;


import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lcm.web.main.dao.MainDAO;
import com.lcm.web.tetris.dao.TetrisDAO;
import com.lcm.web.tetris.vo.Tetris;

@Service
public class TetrisService {
	
	@Autowired
	private TetrisDAO tetrisDAO;
	
	public int insertScore(HashMap<String, Object> param) {
		int result = tetrisDAO.insertScore(param);
		return result;
	}
	
	public ArrayList<Tetris> getScore() {
		ArrayList<Tetris> list = tetrisDAO.getScore();
		
		return list;
	}
}
