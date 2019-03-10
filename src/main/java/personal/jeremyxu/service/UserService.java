package personal.jeremyxu.service;

import personal.jeremyxu.entity.User;
import personal.jeremyxu.vo.UserVO;

import java.util.List;

/**
 * Created by jeremy on 2016/12/28.
 */
public interface UserService {
    User getUser(Integer id);

    int countUsers(UserVO userVO);

    void createUser(UserVO userVO);

    List<UserVO> search(UserVO userVO, int page, int pageSize);
}
