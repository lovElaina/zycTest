package com.ruoyi.system.service.impl;

import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.system.domain.SysApply;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.mapper.SysApplyMapper;
import com.ruoyi.system.mapper.SysAttendMapper;
import com.ruoyi.system.mapper.SysUserMapper;
import com.ruoyi.system.service.ISysApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class SysApplyServiceImpl implements ISysApplyService {

    @Autowired
    private SysApplyMapper applyMapper;

    @Autowired
    private SysAttendMapper attendMapper;

    @Autowired
    private SysUserMapper userMapper;

    @Override
    public SysApply selectApplyById(Long applyId) {
        return applyMapper.selectApplyById(applyId);
    }

    @Override
    public List<SysApply> selectApplyList(SysApply apply) {
        return applyMapper.selectApplyList(apply);
    }

    @Override
    @Transactional
    public int updateApply(SysApply apply) {
        //前端进行了批准操作，且申请类型为”开始实习“
        //默认无法当天开始，所以设为未实习
        if(Objects.equals(apply.getApplyType(), "0") &&apply.getStatus()==1L){
            SysUser user = userMapper.selectUserById(apply.getUserId());
            user.setInternshipStatus("0");
            user.setStartTime(apply.getStartTime().toString());
            user.setEndTime(apply.getEndTime().toString());
            //这里自动添加了attend
            userMapper.updateUser(user);

            attendMapper.deleteAttendByUserId(apply.getUserId());
            insertAttendItem(apply);
        }
        return applyMapper.updateApply(apply);
    }

    public void insertAttendItem(SysApply apply){
        Long userId = apply.getUserId();
        SysAttend attend = new SysAttend();
        attend.setUserId(userId);
        attend.setAttendDay(0L);
        attend.setAbsentDay(0L);
        attend.setLateDay(0L);
        attend.setLeaveDay(0L);
        attend.setTotalDay(0L);
        attend.setStatus("0"); //未开始
        attendMapper.insertAttend(attend);
    }

    @Override
    public int deleteApplyById(Long applyId) {
        return applyMapper.deleteApplyById(applyId);
    }

    @Override
    public int deleteApplyByIds(Long[] applyIds) {
        return applyMapper.deleteApplyByIds(applyIds);
    }
}
