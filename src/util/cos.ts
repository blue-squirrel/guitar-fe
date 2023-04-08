// import moment from 'moment'
// import { credential } from '@/api/common'
import COS from 'cos-js-sdk-v5';
export const uploadCos = async (file, fileName) => {
 // 为了保证桶的数据安全，数据桶的参数需要后端给你传，这样比较安全
//  const res = await credential({ bucketKey: 'gas_bucket' })
let res = {
    tmpSecretId: 'AKIDHNDm58vRfdKlvbCxSgdlcCWaNs6uWqtf',
    tmpSecretKey: 'ZqqZ0E9nAF3ZogHbePt5zbt0rSmtiGWV',
    sessionToken: 'xxxxx',
    bucketName: 'blue-squirrel-1257450790',
    region: 'ap-beijing',
    expiredTime: 1580000900
};
 const { tmpSecretId, tmpSecretKey, sessionToken, bucketName, region, expiredTime } = res;
 // 创建桶的实例
 const cos = new COS({
    SecretId: tmpSecretId, // 身份识别ID
    SecretKey: tmpSecretKey // 身份秘钥
  })
//  const cos = new COS({
//    // 必选参数
//    getAuthorization: (options, callback) => {
//      const obj = {
//        TmpSecretId: tmpSecretId,
//        TmpSecretKey: tmpSecretKey,
//        XCosSecurityToken: sessionToken,
//        ExpiredTime: expiredTime // 时间戳，单位秒，如：1580000900
//      }
//      callback(obj)
//    }
//  })

 // 上传图片
 return new Promise((resolve, reject) => {
   // 这里使用最简单的 putObject 方法上传你需要上传的文件。
   cos.putObject({
     Bucket: bucketName, /* 必须 */
     Region: region, /* 存储桶所在地域，必须字段 */
     // Key: `${new Date().getTime()}${fileName}`,
     Key: '/guitar/' + fileName,
     StorageClass: 'STANDARD',
     Body: file, // 上传文件对象
    //  onProgress: progressData => {
    //    console.log(JSON.stringify(progressData))
    //  }
   }, (err, data) => {
     // 将上传后的封面进行路径拼接保存到本地
     resolve(data)
     reject(err)
   })
 })
}