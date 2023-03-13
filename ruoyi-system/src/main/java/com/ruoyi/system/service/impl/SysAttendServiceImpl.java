package com.ruoyi.system.service.impl;

import com.ruoyi.common.annotation.DataScope;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.mapper.SysAttendMapper;
import com.ruoyi.system.mapper.SysUserMapper;
import com.ruoyi.system.service.ISysAttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SysAttendServiceImpl implements ISysAttendService {

    @Autowired
    private SysAttendMapper attendMapper;
    @Autowired
    private SysUserMapper userMapper;


    @Override
    public List<SysAttend> selectAttendList() {
        return attendMapper.selectAttendList();
    }

    @Override
    public Long selectAttendIdByUserId(Long userId) {
        return attendMapper.selectAttendIdByUserId(userId);
    }
}
