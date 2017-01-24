package com.lcm.web.main.dao;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.lcm.web.common.dao.AbstractDAO;

@Repository
public class MainDAO extends AbstractDAO {

	public void insertLocation(HashMap<String, Object> param) {
		insert("MainDAO.insertLocation", param);
	}
	
	public HashMap<String, Object> getLocation(HashMap<String, Object> param) {
		return (HashMap<String, Object>) selectOne("MainDAO.getLocation", param);
	}
}
