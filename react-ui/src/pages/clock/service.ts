import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';

export async function queryCurrentUserInfo(): Promise<{ data: API.GetUserInfoResult }> {
  return { data: await request('/getInfo') }
}


// 查询出勤总表
// @ts-ignore
export async function getAttendList () {
  //const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/list`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// @ts-ignore
export async function getAttendLogListByUserId(params,userId){
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/user/${userId}?${queryString}`,{
    //data: params,
    method: 'GET',
      headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 新增打卡记录
// @ts-ignore
export async function addLog (params) {
  return request(`/system/attend/insert`, {
    method: 'POST',
    data: params
  });
}












// 修改岗位信息
// @ts-ignore
export async function updatePost (params) {
  return request('/system/post', {
    method: 'PUT',
    data: params
  });
}

// 删除岗位信息
// @ts-ignore
export async function removePost (ids) {
  return request(`/system/post/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 导出岗位信息
// @ts-ignore
export function exportPost (params) {
  return downLoadXlsx(`/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
}
