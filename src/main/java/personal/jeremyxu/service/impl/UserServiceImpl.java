package personal.jeremyxu.service.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import personal.jeremyxu.dao.UserMapper;
import personal.jeremyxu.entity.User;
import personal.jeremyxu.entity.enums.UserState;
import personal.jeremyxu.entity.filters.UserCriteria;
import personal.jeremyxu.service.UserService;
import personal.jeremyxu.vo.UserVO;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by jeremy on 2016/11/5.
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    public User getUser(Integer id){
        return userMapper.selectByPrimaryKey(id);
    }

    public int countUsers(UserVO userVO) {
        UserCriteria criteria = getUserCriteria(userVO);
        return userMapper.countByCriteria(criteria);
    }

    public void createUser(UserVO userVO) {
        User u = new User();
        BeanUtils.copyProperties(userVO, u);
        userMapper.insert(u);
    }

    /**
     * @param page
     * @param pageSize 每页显示数量
     */
    @Override
    public List<UserVO> search(UserVO userVO, int page, int pageSize) {
        UserCriteria criteria = getUserCriteria(userVO);
        criteria.setOffset(pageSize * (page-1));
        criteria.setLimit(pageSize);
        List<User> users = userMapper.selectByCriteria(criteria);
        List<UserVO> userVOs = new ArrayList<UserVO>();
        for(User user : users){
            UserVO userVO2 = new UserVO();
            BeanUtils.copyProperties(user, userVO2);
            userVOs.add(userVO2);
        }
        return userVOs;
    }

    private UserCriteria getUserCriteria(UserVO userVO) {
        UserCriteria criteria = new UserCriteria();
        if(userVO.getName() != null){
            criteria.createCriteria().andNameEqualTo(userVO.getName());
        }
        if(userVO.getAge() != null){
            criteria.createCriteria().andAgeEqualTo(userVO.getAge());
        }
        if(userVO.getAddress() != null){
            criteria.createCriteria().andAddressEqualTo(userVO.getAddress());
        }
        if(userVO.getUserStatus() != null){
            criteria.createCriteria().andUserStatusEqualTo(userVO.getUserStatus());
        }
        return criteria;
    }
}
