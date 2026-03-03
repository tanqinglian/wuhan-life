// 微信登录配置和工具函数

// 检查微信配置
if (!process.env.WECHAT_APPID || !process.env.WECHAT_SECRET) {
  console.warn('⚠️ 微信登录未配置，请设置 WECHAT_APPID 和 WECHAT_SECRET 环境变量')
}

interface WeChatLoginResponse {
  openid: string;
  session_key: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}

// 微信登录URL生成
export function getWeChatLoginUrl(redirectUri: string, state?: string) {
  const appId = process.env.WECHAT_APPID;
  const encodedUri = encodeURIComponent(redirectUri);

  return `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${encodedUri}&response_type=code&scope=snsapi_login&state=${state || ''}#wechat_redirect`;
}

// 通过code获取access_token
export async function getWeChatAccessToken(code: string): Promise<WeChatLoginResponse> {
  const appId = process.env.WECHAT_APPID;
  const secret = process.env.WECHAT_SECRET;

  const response = await fetch(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${secret}&code=${code}&grant_type=authorization_code`
  );

  return response.json();
}

// 获取微信用户信息
export async function getWeChatUserInfo(accessToken: string, openid: string) {
  const response = await fetch(
    `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openid}`
  );

  return response.json();
}

// 验证微信登录状态
export function isValidWeChatConfig(): boolean {
  return !!(process.env.WECHAT_APPID && process.env.WECHAT_SECRET);
}
