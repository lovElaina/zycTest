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


    @GetMapping("/list")
    public TableDataInfo list(SysAttend attend)
    {
        startPage();
        List<SysAttend> list = attendService.selectAttendList(attend);
        return getDataTable(list);
    }

    @GetMapping("/{attendId}")
    public TableDataInfo attendLogList(@PathVariable(value = "attendId") Long attendId){
        startPage();
        List<SysAttendLog> attendLogList = attendLogService.selectAttendLogListByAttendId(attendId);
        return getDataTable(attendLogList);
    }

    @PutMapping("/update")
    public AjaxResult changeStatus(@RequestBody SysAttendLog attendLog){
        return toAjax(attendLogService.updateAttendLog(attendLog));
    }


}
