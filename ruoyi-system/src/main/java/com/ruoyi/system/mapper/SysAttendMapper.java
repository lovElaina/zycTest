package com.ruoyi.system.mapper;


import com.ruoyi.system.domain.SysAttend;

import java.util.List;

public interface SysAttendMapper {

    public List<SysAttend> selectAttendList();

    public boolean updateAttend(SysAttend sysAttend);

    public int insertAttend(SysAttend sysAttend);

    public int deleteAttendByUserId(Long userId);

    public Long selectAttendIdByUserId(Long userId);

    public SysAttend selectAttendByAttendId(Long attendId);
}
