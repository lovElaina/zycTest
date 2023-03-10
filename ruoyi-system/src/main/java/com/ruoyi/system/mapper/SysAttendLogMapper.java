package com.ruoyi.system.mapper;

import com.ruoyi.system.domain.SysAttendLog;

import java.util.List;

public interface SysAttendLogMapper {

    public List<SysAttendLog> selectAttendLogListByAttendId(Long attendId);

    public boolean updateAttendLog(SysAttendLog sysAttendLog);

}
