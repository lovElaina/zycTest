package com.ruoyi.system.service;


import com.ruoyi.system.domain.SysAttend;

import java.util.List;

public interface ISysAttendService {

    /**
     * 根据条件分页查询用户列表
     * @return 出勤信息集合信息
     */
    public List<SysAttend> selectAttendList();

    public Long selectAttendIdByUserId(Long userId);

    public boolean updateAttend(SysAttend sysAttend);

    public SysAttend selectAttendByAttendId(Long attendId);
}
