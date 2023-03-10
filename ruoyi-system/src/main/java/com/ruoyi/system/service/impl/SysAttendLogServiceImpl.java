package com.ruoyi.system.service.impl;

import com.ruoyi.common.annotation.DataScope;
import com.ruoyi.system.domain.SysAttendLog;
import com.ruoyi.system.mapper.SysAttendLogMapper;
import com.ruoyi.system.service.ISysAttendLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SysAttendLogServiceImpl implements ISysAttendLogService {

    @Autowired
    private SysAttendLogMapper attendLogMapper;

    @Override
    @DataScope(deptAlias = "d", userAlias = "u")
    public List<SysAttendLog> selectAttendLogListByAttendId(Long attendId) {
        return attendLogMapper.selectAttendLogListByAttendId(attendId);
    }

    @Override
    @DataScope(deptAlias = "d", userAlias = "u")
    public boolean updateAttendLog(SysAttendLog attendLog) {
        return attendLogMapper.updateAttendLog(attendLog);
    }
}
