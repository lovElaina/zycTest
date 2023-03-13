package com.ruoyi.web.controller.system;

import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.domain.SysAttendLog;
import com.ruoyi.system.service.ISysAttendLogService;
import com.ruoyi.system.service.ISysAttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/system/attend")
public class SysAttendController extends BaseController {
    @Autowired
    private ISysAttendService attendService;

    @Autowired
    private ISysAttendLogService attendLogService;

    //得到所有打卡人的信息
    @GetMapping("/list")
    public TableDataInfo list()
    {
        startPage();
        List<SysAttend> list = attendService.selectAttendList();
        return getDataTable(list);
    }

    //根据attendId查询所有打卡记录
    @GetMapping("/{attendId}")
    public TableDataInfo attendLogList(@PathVariable(value = "attendId") Long attendId){
        startPage();
        List<SysAttendLog> attendLogList = attendLogService.selectAttendLogListByAttendId(attendId);
        return getDataTable(attendLogList);
    }

    //根据userId查询所有打卡记录
    @GetMapping("/user/{userId}")
    public TableDataInfo attendLogListByUserId(@PathVariable(value = "userId") Long userId){
        startPage();
        Long attendId = attendService.selectAttendIdByUserId(userId);
        List<SysAttendLog> attendLogList = attendLogService.selectAttendLogListByAttendId(attendId);
        return getDataTable(attendLogList);
    }


    //新增打卡记录
    @PostMapping("/insert")
    public AjaxResult insertLog(@RequestBody SysAttendLog attendLog){
        return toAjax(attendLogService.insertAttendLog(attendLog));
    }

    //改变打卡状态
    @PutMapping("/update")
    public AjaxResult changeStatus(@RequestBody SysAttendLog attendLog){
        return toAjax(attendLogService.updateAttendLog(attendLog));
    }


}
