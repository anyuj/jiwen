import type { TranslationDictionary } from "@better-auth/i18n";
import type { Locale } from "@jiwen/config";

export const authTranslations = {
  en: {},
  zh: {
    USER_NOT_FOUND: "用户不存在",
    FAILED_TO_CREATE_USER:
      "创建用户失败。请稍后重试。如果问题仍然存在，请联系我们。",
    FAILED_TO_CREATE_SESSION:
      "创建会话失败。请稍后重试。如果问题仍然存在，请联系我们。",
    FAILED_TO_UPDATE_USER:
      "更新用户失败。请稍后重试。如果问题仍然存在，请联系我们。",
    FAILED_TO_GET_SESSION:
      "获取会话失败。请稍后重试。如果问题仍然存在，请联系我们。",
    INVALID_PASSWORD: "密码无效",
    INVALID_EMAIL: "邮箱地址无效",
    INVALID_EMAIL_OR_PASSWORD: "邮箱或密码错误",
    SOCIAL_ACCOUNT_ALREADY_LINKED: "该社交账号已关联到其他用户",
    PROVIDER_NOT_FOUND: "未找到认证提供商",
    INVALID_TOKEN: "令牌无效或已过期",
    ID_TOKEN_NOT_SUPPORTED: "不支持 ID 令牌认证",
    FAILED_TO_GET_USER_INFO: "获取用户信息失败",
    USER_EMAIL_NOT_FOUND: "未找到用户邮箱",
    EMAIL_NOT_VERIFIED: "请验证您的邮箱地址",
    PASSWORD_TOO_SHORT: "密码太短",
    PASSWORD_TOO_LONG: "密码太长",
    USER_ALREADY_EXISTS: "用户已存在",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "该邮箱已被注册，请使用其他邮箱",
    EMAIL_CAN_NOT_BE_UPDATED: "无法更新邮箱地址",
    CREDENTIAL_ACCOUNT_NOT_FOUND: "未找到凭证账户",
    SESSION_EXPIRED: "会话已过期，请重新登录",
    FAILED_TO_UNLINK_LAST_ACCOUNT: "无法解除最后一个认证方式",
    ACCOUNT_NOT_FOUND: "账户不存在",
    USER_ALREADY_HAS_PASSWORD: "您已设置密码，请提供当前密码以继续",
  },
} satisfies Record<Locale, TranslationDictionary>;
