package personal.jeremyxu.action;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by jeremy on 2016/12/27.
 */
public class Resp {
    private boolean success;
    private String errMsg;
    private Map<String, Object> data = new HashMap<String, Object>();

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getErrMsg() {
        return errMsg;
    }

    public void setErrMsg(String errMsg) {
        this.errMsg = errMsg;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
