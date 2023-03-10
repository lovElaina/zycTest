package com.ruoyi.system.domain;

import com.ruoyi.common.core.domain.BaseEntity;

public class SysAttendLog extends BaseEntity {

    private Long logId;

    private Long attendId;

    private Long attendDate;

    private Long workTime;

    private Long restTime;

    private String result;

    public Long getLogId() {
        return logId;
    }

    public void setLogId(Long logId) {
        this.logId = logId;
    }

    public Long getAttendId() {
        return attendId;
    }

    public void setAttendId(Long attendId) {
        this.attendId = attendId;
    }

    public Long getAttendDate() {
        return attendDate;
    }

    public void setAttendDate(Long attendDate) {
        this.attendDate = attendDate;
    }

    public Long getWorkTime() {
        return workTime;
    }

    public void setWorkTime(Long workTime) {
        this.workTime = workTime;
    }

    public Long getRestTime() {
        return restTime;
    }

    public void setRestTime(Long restTime) {
        this.restTime = restTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    @Override
    public String toString() {
        return "SysAttendLog{" +
                "logId=" + logId +
                ", attendId=" + attendId +
                ", attendDate=" + attendDate +
                ", workTime=" + workTime +
                ", restTime=" + restTime +
                ", result='" + result + '\'' +
                '}';
    }
}
