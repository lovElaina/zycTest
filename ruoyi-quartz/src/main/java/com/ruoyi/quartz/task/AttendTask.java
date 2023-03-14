package com.ruoyi.quartz.task;

import com.ruoyi.common.annotation.Anonymous;
import com.ruoyi.common.core.domain.entity.SysUser;
import com.ruoyi.system.domain.SysAttend;
import com.ruoyi.system.domain.SysAttendLog;
import com.ruoyi.system.service.ISysAttendLogService;
import com.ruoyi.system.service.ISysAttendService;
import com.ruoyi.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Component("attendTask")
public class AttendTask {

    @Autowired
    private ISysAttendService attendService;

    @Autowired
    private ISysAttendLogService attendLogService;

    @Autowired
    private ISysUserService userService;


    public void absenceRecord(){
        System.out.println("----------------------------------------------");
        List<SysAttend> list = attendService.selectAttendList();
        for (SysAttend sysAttend : list) {
            //当出勤表的状态不为正常时，不对该条目进行记录。
            if(!Objects.equals(sysAttend.getStatus(), "1"))continue;
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

//    //每天凌晨1：00检查有没有当天开始的实习，以及前一天结束的实习
//    public void changeAttendStatus(){
//        List<SysAttend> list = attendService.selectAttendList();
//        for (SysAttend sysAttend : list) {
////            Long userId = sysAttend.getUserId();
////            SysUser sysUser =
//            if(conversionTime(sysAttend.getStartTime()).equals(conversionTime(String.valueOf(System.currentTimeMillis())))){
//                sysAttend.setStatus("0");
//                attendService.updateAttend(sysAttend);
//            }
//
//            if(ifDiffOneDay(sysAttend.getEndTime(),System.currentTimeMillis()+"")){
//                sysAttend.setStatus("2");
//                attendService.updateAttend(sysAttend);
//            }
//        }
//
//    }

    //每天凌晨1：00检查有没有当天开始的实习，以及前一天结束的实习
    //当学生实习状态改变时，attend表的状态也同时改变，参见sysUserServiceImpl的310行
    //所以我们只需要在定时任务中改动学生实习状态即可。
    public void changeInternshipStatus(){
        List<SysUser> list = userService.selectStudentList(new SysUser());
        for (SysUser sysUser : list) {

            if(conversionTime(sysUser.getStartTime()).equals(conversionTime(String.valueOf(System.currentTimeMillis())))){
                sysUser.setInternshipStatus("1");
                userService.updateUser(sysUser);
            }

            if(ifDiffOneDay(sysUser.getEndTime(),System.currentTimeMillis()+"")){
                sysUser.setInternshipStatus("2");
                userService.updateUser(sysUser);
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

    //1<2
    public static boolean ifDiffOneDay(String stamp1,String stamp2){
        Date date1 = new Date(Long.parseLong(stamp1));
        Date date2 = new Date(Long.parseLong(stamp2));

        long oneDayInMillis = 24 * 60 * 60 * 1000; // 一天的毫秒数
        Date nextDay = new Date(date1.getTime() + oneDayInMillis);

        return nextDay.equals(date2);
    }
}
