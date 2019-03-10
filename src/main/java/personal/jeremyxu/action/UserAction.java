package personal.jeremyxu.action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import personal.jeremyxu.entity.enums.UserState;
import personal.jeremyxu.service.UserService;
import personal.jeremyxu.vo.UserVO;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by jeremy on 2016/11/5.
 */
@Controller
@RequestMapping("/user")
public class UserAction {
    @Resource
    private UserService userService;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Resp add(@RequestBody UserVO userVO) {
        Resp resp = new Resp();
        try {
            if(userVO.getUserStatus() == null){
                userVO.setUserStatus(UserState.ENABLED);
            }
            userService.createUser(userVO);
            resp.setSuccess(true);
        } catch (Exception e){
            resp.setErrMsg(e.getMessage());
            resp.setSuccess(false);
        }
        return resp;
    }

    @RequestMapping(value = "/search", method = RequestMethod.POST)
    @ResponseBody
    public Resp search(@RequestBody UserVO userVO, @RequestParam int page, @RequestParam int pageSize) {
        Resp resp = new Resp();
        try {
            int total = userService.countUsers(userVO);
            List<UserVO> users = userService.search(userVO, page, pageSize);
            resp.getData().put("total", total);
            resp.getData().put("users", users);
            resp.setSuccess(true);
        } catch (Exception e){
            resp.setErrMsg(e.getMessage());
            resp.setSuccess(false);
        }
        return resp;
    }

}
