// export const GetBaseConfig = () => {
//     return axiosInstance({
//       method: "get",
//       url: urls.BaseConfigs(),
//       crossDomain: true,
//       params: {
//         lang: LanguageManager.getLang()
//       }
//     });
//   };


import axiosInstance from "./axiosInstance";

const baseURL = "/list";

export const getTodoList = () => {
  return axiosInstance({
    method: "get",
    url: baseURL,
    
  });
};
//   export const LogoutUser = () =>{
//     const data ={
//       lang: LanguageManager.getLang(),
//       player_id: localStorage.getItem('GanjehId')
//     }
//     return axiosInstance({
//       method:'post',
//       url:urls.Logout(),
//       crossDomain: true,
//       data:data
//     })
//   }

//   export const postNotification = (token) => {
//     return axiosInstance({
//       method: "post",
//       url: urls.PostNoti(),
//       data: {
//         lang: LanguageManager.getLang(),
//         platform: "Web",
//         player_id: token
//       }
//     });
//   };
