package com.ruoyi.quartz.task;

import com.ruoyi.common.annotation.Anonymous;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.domain.SysAttendLog;
import com.ruoyi.system.service.ISysAttendLogService;
import com.ruoyi.system.service.ISysAttendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component("attendTask")
public class AttendTask {

    @Autowired
    private ISysAttendService attendService;

    @Autowired
    private ISysAttendLogService attendLogService;

    public void absenceRecord(){
        System.out.println("----------------------------------------------");
        List<SysAttend> list = attendService.selectAttendList();
        for (SysAttend sysAttend : list) {
            List<SysAttendLog> logList = attendLogService.selectAttendLogListByAttendId(sysAttend.getAttendId());
            int i = 0;
            for(;i<logList.size();i++){
                if(conversionTime(logList.get(i).getAttendDate().toString()).equals(conversionTime(String.valueOf(System.currentTimeMillis())))){
                    break;
                }
            }

            if(i == logList.size()){
                SysAttendLog newAttendLog = new SysAttendLog();
                newAttendLog.setAttendId(sysAttend.getAttendId());
                newAttendLog.setAttendDate(System.currentTimeMillis());
                newAttendLog.setResult("2");
                attendLogService.insertAttendLog(newAttendLog);
            }

        }
    }

    public static String conversionTime(String timeStamp) {
        //yyyy-MM-dd HH:mm:ss 转换的时间格式  可以自定义
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        //转换
        String time = sdf.format(new Date(Long.parseLong(timeStamp)));
        return time;
    }
}
