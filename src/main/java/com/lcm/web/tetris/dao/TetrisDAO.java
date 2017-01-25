package com.lcm.web.tetris.dao;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.lcm.web.common.dao.AbstractDAO;
import com.lcm.web.tetris.vo.Tetris;

@Repository
public class TetrisDAO extends AbstractDAO {

	public int insertScore(HashMap<String, Object> param) {
		int result = (Integer)insert("TetrisDAO.insertScore", param);
		return result;
	}

	public ArrayList<Tetris> getScore() {
		ArrayList<Tetris> list = (ArrayList<Tetris>) selectList("TetrisDAO.getScore");
		return list;
	}
}
