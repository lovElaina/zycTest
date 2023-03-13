package com.ruoyi.system.service;

import com.ruoyi.system.domain.SysAttendLog;

import java.util.List;

public interface ISysAttendLogService {
    public List<SysAttendLog> selectAttendLogListByAttendId(Long attendId);

    public boolean updateAttendLog(SysAttendLog attendLog);

    public int insertAttendLog(SysAttendLog attendLog);
}
