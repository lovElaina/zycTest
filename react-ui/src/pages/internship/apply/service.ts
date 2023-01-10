import { downLoadXlsx } from '@/utils/downloadfile';
import request from '@/utils/request';
//import type { PostType, PostListParams } from './data.d';


// 查询岗位信息列表
// @ts-ignore
export async function getApplyList () {
  return request(`/internship/apply/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  });
}

// // 查询岗位信息详细
// // @ts-ignore
// export function getPost (postId) {
//   return request(`/system/post/${postId}`, {
//     method: 'GET'
//   });
// }
//
// // 新增岗位信息
// // @ts-ignore
// export async function addPost (params) {
//   return request('/system/post', {
//     method: 'POST',
//     data: params
//   });
// }

// 修改岗位信息
// @ts-ignore
export async function updatePost (params) {
  return request('/internship/apply', {
    method: 'PUT',
    data: params
  });
}

// 删除岗位信息
// @ts-ignore
export async function removePost (ids) {
  return request(`/internship/apply/${ids}`, {
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
