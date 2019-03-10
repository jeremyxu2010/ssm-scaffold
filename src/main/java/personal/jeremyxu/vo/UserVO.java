package personal.jeremyxu.vo;

import personal.jeremyxu.entity.enums.UserState;

/**
 * Created by jeremy on 2016/12/28.
 */
public class UserVO {
    private Integer id;
    private String name;
    private Integer age;
    private String address;
    private UserState userStatus;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public UserState getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(UserState userStatus) {
        this.userStatus = userStatus;
    }
}
