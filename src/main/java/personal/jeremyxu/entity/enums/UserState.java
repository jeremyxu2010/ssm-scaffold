package personal.jeremyxu.entity.enums;

import personal.jeremyxu.entity.enums.base.CodeTypeEnum;

/**
 * Created by jeremy on 05/03/2017.
 */
public enum UserState implements CodeTypeEnum<UserState> {
    ENABLED((byte)0),
    DISABLED((byte)1);

    private final Byte code;

    UserState(Byte code) {
        this.code = code;
    }

    @Override
    public Byte getCode(){
        return this.code;
    }
}
