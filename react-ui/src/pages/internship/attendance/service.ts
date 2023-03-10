import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';


// 查询个人出勤记录列表
// @ts-ignore
export async function getAttendLogListByAttendId (params,attendId) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/${attendId}?${queryString}`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 修改出勤信息
// @ts-ignore
export async function updateAttendLog (params) {
  return request('/system/attend/update', {
    method: 'PUT',
    data: params
  });
}

// 查询出勤信息列表
// @ts-ignore
export async function getAttendList (params) {
  const queryString = new URLSearchParams(params).toString();
  return request(`/system/attend/list?${queryString}`, {
    //data: params,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 查询出勤信息详细
// @ts-ignore
export function getPost (postId) {
  return request(`/system/post/${postId}`, {
    method: 'GET'
  });
}



// 新增出勤信息
// @ts-ignore
export async function addPost (params) {
  return request('/system/post', {
    method: 'POST',
    data: params
  });
}

// 修改出勤信息
// @ts-ignore
export async function updatePost (params) {
  return request('/system/post', {
    method: 'PUT',
    data: params
  });
}

// 删除出勤信息
// @ts-ignore
export async function removePost (ids) {
  return request(`/system/post/${ids}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// 导出出勤信息
// @ts-ignore
export function exportPost (params) {
  return downLoadXlsx(`/system/post/export`, { params }, `post_${new Date().getTime()}.xlsx`);
}
